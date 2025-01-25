from django.http import JsonResponse
from .utils import read_json_file
from .models import Perfume
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import os
import pickle
import numpy as np
import pandas as pd
import joblib
from tensorflow.keras.applications import VGG16
from tensorflow.keras.applications.vgg16 import preprocess_input
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from sklearn.preprocessing import StandardScaler
import requests
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view

# Load your CSV file containing perfume data
df = pd.read_csv("data/csv/prepared_data.csv")

# Load the pre-trained VGG16 model with ImageNet weights
base_model = VGG16(
    weights=f"{os.getcwd()}/models/tensorflow/vgg16_weights_tf_dim_ordering_tf_kernels_notop.h5",
    include_top=False,
    input_shape=(128, 128, 3)
)

# Load extracted features from a file
def load_features(file_path):
    with open(file_path, 'rb') as file:
        features_list = pickle.load(file)
    print(f"Features loaded from {file_path}")
    return features_list

# Load the KNN model
knn = joblib.load("models/knn/perfume_model.pkl")

# Path to the main images folder
main_images_folder = 'output'
features_file = "models/tensorflow/features.pkl"

# Load or compute features
if os.path.exists(features_file):
    example_features_list = load_features(features_file)
else:
    example_features_list = []
    for folder_name in os.listdir(main_images_folder):
        folder_path = os.path.join(main_images_folder, folder_name)
        if os.path.isdir(folder_path):
            example_features_list.extend(process_image_folder(folder_path))
    save_features(example_features_list, features_file)

# Global feature dictionary
features = {
    'feature_Longevity_Men': 0,
    'feature_Longevity_Unisex': 0,
    'feature_Longevity_Women': 0,
    'feature_Occasion_Business': 0,
    'feature_Occasion_Daily': 0,
    'feature_Occasion_Evening': 0,
    'feature_Occasion_Leisure': 0,
    'feature_Occasion_Night_Out': 0,
    'feature_Occasion_Sports': 0,
    'feature_Season_Fall': 0,
    'feature_Season_Spring': 0,
    'feature_Season_Summer': 0,
    'feature_Season_Winter': 0,
    'feature_Style_Classic': 0,
    'feature_Style_Modern': 0,
    'feature_Type_Animalic': 0,
    'feature_Type_Aquatic': 0,
    'feature_Type_Chypre': 0,
    'feature_Type_Citrus': 0,
    'feature_Type_Creamy': 0,
    'feature_Type_Earthy': 0,
    'feature_Type_Floral': 0,
    'feature_Type_Fougere': 0,
    'feature_Type_Fresh': 0,
    'feature_Type_Fruity': 0,
    'feature_Type_Gourmand': 0,
    'feature_Type_Green': 0,
    'feature_Type_Leathery': 0,
    'feature_Type_Oriental': 0,
    'feature_Type_Powdery': 0,
    'feature_Type_Resinous': 0,
    'feature_Type_Smoky': 0,
    'feature_Type_Spicy': 0,
    'feature_Type_Sweet': 0,
    'feature_Type_Synthetic': 0,
    'feature_Type_Woody': 0
}

# Building a hash table to convert brand_encoded to brand's name and image_url
table = {}
for row in df.iterrows():
    brand_encoded = row[1]["brand_encoded"]
    brand = row[1]["brand"]
    image_url = row[1]["image_url"]
    table[str(brand_encoded)] = {"brand": brand, "image_url": image_url}

def style_detection(file_path, example_features_list):
    try:
        input_image = preprocess_image(file_path)
        result = compare_images(input_image, example_features_list)
        
        return result

    except FileNotFoundError as e:
        print(str(e))

# Function to preprocess images
def preprocess_image(image_path):
    image = load_img(image_path, target_size=(128, 128))
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    image = preprocess_input(image)
    return image

# Function to extract features from images
def extract_features(image):
    features = base_model.predict(image)
    features = features.flatten()
    return features

# Function to compare input image with example images
def compare_images(input_image, example_features_list):
    input_features = extract_features(input_image)
    for features, folder_path in example_features_list:
        similarity = np.dot(input_features, features) / (np.linalg.norm(input_features) * np.linalg.norm(features))
        if similarity > 0.9:  # Adjust threshold as needed
            return os.path.basename(folder_path)
    return "No matching image found."

df.drop(columns=["brand", "image_url"], inplace=True)

X = df.drop(columns=['brand_encoded'])
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Function to recommend perfumes based on a set of features (index or feature vector)
def recommend_perfumes(input_features, knn_model, data, n_recommendations=5):
    # Transform the input features using the same scaler
    print(input_features)
    input_features = np.array(list(features.values()))
    input_scaled = scaler.transform([input_features])
    print(input_scaled)
    
    # Find the nearest neighbors (similar perfumes)
    distances, indices = knn_model.kneighbors(input_scaled, n_neighbors=n_recommendations)
    
    # Get the recommended perfumes based on the indices
    recommended_perfumes = data.iloc[indices[0]]

    print(input_features)

    return recommended_perfumes[['brand_encoded']]  # Display only the brand_encoded

# Function to get the updated features from the API
@api_view(['POST'])
def update_features(request):
    global features

    # Expect the data to be in the form of a dictionary matching the feature keys
    incoming_data = request.data

    # If an image is provided, process the image and detect style
    image_file = request.FILES.get('image', None)
    
    if image_file:
        # Define the temporary directory and ensure it exists
        temp_dir = "temp"
        os.makedirs(temp_dir, exist_ok=True)  # Create the directory if it doesn't exist
        
        # Save the uploaded image temporarily to process it
        image_path = os.path.join(temp_dir, image_file.name)
        with open(image_path, 'wb') as f:
            f.write(image_file.read())
        
        # Call the style detection function with the image
        result = style_detection(image_path, example_features_list)
        
        # Update the style features based on the detection result
        print(result)
        if result == "modern":
            features["feature_Style_Modern"] = 1
        else:
            features["feature_Style_Classic"] = 1

        print(features)

        # Optionally delete the temporary image after processing
        os.remove(image_path)

    print(features)

    # Now that the features are updated, generate recommendations
    recommended_perfumes = recommend_perfumes(features, knn, df)

    # Return the recommended perfumes (brand and image URL)
    recommendations = []
    for index, row in recommended_perfumes.iterrows():
        brand = table[str(row['brand_encoded'])]['brand']
        image_url = table[str(row['brand_encoded'])]['image_url']
        recommendations.append({'brand': brand, 'image_url': image_url})

    # Reset features back to the empty state
    reset_features()

    return Response(recommendations, status=status.HTTP_200_OK)

# Function to reset the features to empty values
def reset_features():
    global features
    features = {
        'feature_Longevity_Men': 0,
        'feature_Longevity_Unisex': 0,
        'feature_Longevity_Women': 0,
        'feature_Occasion_Business': 0,
        'feature_Occasion_Daily': 0,
        'feature_Occasion_Evening': 0,
        'feature_Occasion_Leisure': 0,
        'feature_Occasion_Night_Out': 0,
        'feature_Occasion_Sports': 0,
        'feature_Season_Fall': 0,
        'feature_Season_Spring': 0,
        'feature_Season_Summer': 0,
        'feature_Season_Winter': 0,
        'feature_Style_Classic': 0,
        'feature_Style_Modern': 0,
        'feature_Type_Animalic': 0,
        'feature_Type_Aquatic': 0,
        'feature_Type_Chypre': 0,
        'feature_Type_Citrus': 0,
        'feature_Type_Creamy': 0,
        'feature_Type_Earthy': 0,
        'feature_Type_Floral': 0,
        'feature_Type_Fougere': 0,
        'feature_Type_Fresh': 0,
        'feature_Type_Fruity': 0,
        'feature_Type_Gourmand': 0,
        'feature_Type_Green': 0,
        'feature_Type_Leathery': 0,
        'feature_Type_Oriental': 0,
        'feature_Type_Powdery': 0,
        'feature_Type_Resinous': 0,
        'feature_Type_Smoky': 0,
        'feature_Type_Spicy': 0,
        'feature_Type_Sweet': 0,
        'feature_Type_Synthetic': 0,
        'feature_Type_Woody': 0
    }

def get_items_from_json(request):
    data = Perfume.objects.all().values()  # Convert queryset to a list of dictionaries
    return JsonResponse(list(data), safe=False)


# Create a logger
@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        # Log the incoming data
        logger.info(f"Received registration data: username={username}, email={email}")

        # Validate that all required fields are provided
        if not username or not password or not email:
            return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the username already exists
        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the email already exists
        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Create a new user
            user = User.objects.create_user(username=username, password=password, email=email)
            return Response({"message": "User created successfully!"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"Error creating user: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# Login user
@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        username = request.data['username']
        password = request.data['password']
        
        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key})
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)