import json
from perfume.models import Perfume

def load_data():
    # Define a mapping from JSON field names to Django model field names
    key_mapping = {
        'feature_Longevity_Men': 'feature_longevity_men',
        'feature_Longevity_Unisex': 'feature_longevity_unisex',
        'feature_Longevity_Women': 'feature_longevity_women',
        'feature_Occasion_Business': 'feature_occasion_business',
        'feature_Occasion_Daily': 'feature_occasion_daily',
        'feature_Occasion_Evening': 'feature_occasion_evening',
        'feature_Occasion_Leisure': 'feature_occasion_leisure',
        'feature_Occasion_Night_Out': 'feature_occasion_night_out',
        'feature_Occasion_Sports': 'feature_occasion_sports',
        'feature_Season_Fall': 'feature_season_fall',
        'feature_Season_Spring': 'feature_season_spring',
        'feature_Season_Summer': 'feature_season_summer',
        'feature_Season_Winter': 'feature_season_winter',
        'feature_Style_Classic': 'feature_style_classic',
        'feature_Style_Modern': 'feature_style_modern',
        'feature_Type_Animalic': 'feature_Type_Animalic',
        'feature_Type_Aquatic': 'feature_Type_Aquatic',
        'feature_Type_Chypre': 'feature_Type_Chypre',
        'feature_Type_Citrus': 'feature_Type_Citrus',
        'feature_Type_Creamy': 'feature_Type_Creamy',
        'feature_Type_Earthy': 'feature_Type_Earthy',
        'feature_Type_Floral': 'feature_Type_Floral',
        'feature_Type_Fougere': 'feature_Type_Fougere',
        'feature_Type_Fresh': 'feature_Type_Fresh',
        'feature_Type_Fruity': 'feature_Type_Fruity',
        'feature_Type_Gourmand': 'feature_Type_Gourmand',
        'feature_Type_Green': 'feature_Type_Green',
        'feature_Type_Leathery': 'feature_Type_Leathery',
        'feature_Type_Oriental': 'feature_Type_Oriental',
        'feature_Type_Powdery': 'feature_Type_Powdery',
        'feature_Type_Resinous': 'feature_Type_Resinous',
        'feature_Type_Smoky': 'feature_Type_Smoky',
        'feature_Type_Spicy': 'feature_Type_Spicy',
        'feature_Type_Sweet': 'feature_Type_Sweet',
        'feature_Type_Synthetic': 'feature_Type_Synthetic',
        'feature_Type_Woody': 'feature_Type_Woody',
    }

    try:
        # Load the JSON file
        with open('data/json/data.json', 'r') as file:
            data = json.load(file)
            for item in data:
                # Prepare the data dictionary for the Perfume model
                perfume_data = {
                    'brand_encoded': item['brand_encoded'],
                    'brand': item['brand'],
                    'image_url': item['image_url'],
                }

                # Map and normalize feature fields
                for json_key, model_field in key_mapping.items():
                    perfume_data[model_field] = bool(item.get(json_key, 0))

                # Create the Perfume instance
                Perfume.objects.create(**perfume_data)
        
        print("Data imported successfully.")
    except FileNotFoundError:
        print("The JSON file was not found. Please check the file path.")
    except Exception as e:
        print(f"An error occurred: {e}")
