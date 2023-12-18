import httpx
from typing import List
from dotenv import load_dotenv
import os
import re

load_dotenv()  # 환경 변수 로드

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

async def call_gpt_api(ingredients: List[str], additional_info: str) -> str:
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}"
    }
    data = {
        "prompt": f"""{additional_info}이 상태에서\n {ingredients}이런 재료를 가지고 \n 
        만들 수 있는 레시피 목록을 한국어로 추천해줘""",
        "max_tokens": 50
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.post("https://api.openai.com/v1/engines/davinci-codex/completions", json=data, headers=headers)
    
    if response.status_code == 200:
        return response.json()["choices"][0]["text"].strip()
    else:
        raise Exception(f"GPT API 요청 실패: {response.status_code}")


async def call_gpt_api_for_recipe(recipe_name: str) -> str:
    
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}"
    }
    data = {
        "prompt": f"{recipe_name}에 대한 레시피를 상세하게 한국어로 단계별로 알려줘",
        "max_tokens": 50
    }
    
    ingredients_data = {
        "prompt": f"{recipe_name}에 대한 재료 목록을 카테고리화 하지 말고 ','로 구분하여 영어로 알려줘",
        "max_tokens": 50
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.post("https://api.openai.com/v1/engines/davinci-codex/completions", json=data, headers=headers)
    async with httpx.AsyncClient() as client:
        ingredients_response = await client.post("https://api.openai.com/v1/engines/davinci-codex/completions", json=ingredients_data, headers=headers)
    
    if response.status_code == 200 and ingredients_response.status_code == 200:
        ingredients = extract_ingredients(ingredients_response)
        return response.json()["choices"][0]["text"].strip(),ingredients
    else:
        raise Exception(f"GPT API 요청 실패: {response.status_code}")
    
    
    
    
    
    
    
    return f"상세 레시피 정보: {recipe_name}"



def extract_ingredients(text: str) -> List[str]:
    # 쉼표나 마침표로 문장을 분리
    sentences = re.split(r'[,.]', text)
    
    # 재료 리스트 초기화
    ingredients = []

    # 각 문장을 순회하며 재료 추출
    for sentence in sentences:
        # 재료 추출 로직 구현 (예: 정규 표현식 사용)
        # 예시: "3개의 달걀"에서 "달걀" 추출
        match = re.search(r'\b(\w+)\b', sentence)
        if match:
            ingredient = match.group(1)
            ingredients.append(ingredient)

    return ingredients

# # GPT로부터 받은 재료 목록 문장
# gpt_output = "3개의 달걀, 200g의 밀가루, 1컵의 우유."

# # 재료 리스트 추출
# ingredients_list = extract_ingredients(gpt_output)
# print(ingredients_list)  # 예: ['달걀', '밀가루', '우유']
