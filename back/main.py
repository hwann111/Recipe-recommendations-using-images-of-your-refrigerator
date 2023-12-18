from fastapi import FastAPI

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

from fastapi import File, UploadFile
from typing import List

from back import database, models, gpt
from back.schema import IngredientsToDelete, RecipeRequest, RecipeSelection
from back.models import Ingredient, User

from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session



def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

app = FastAPI()

#루트 URL 요청 
@app.get("/")
def read_root():
    return{"Hello": "World"}

#로그인은 다음기회에
# #사용자 인증 API구현, 로그인 및 회원가입기능을 위한 API
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# #회원가입기능이긴 하나 굳이 지금선에선 불필요할듯
# @app.post("/token")
# def token():
#     return {"token": "fake-token"}

# @app.get("/user/me")
# def read_users_me(token: str = Depends(oauth2_scheme)):
#     return{"token":token}

# #이미지 받음
# @app.post("/uploadfile/")
# async def create_upload_file(file: UploadFile = File(...)):
#     return {"filename": file.filename}

# #이미지를 업로드해서 재료리스트를 출력
# @app.post("/recognize-ingredients/")
# async def recognize_ingredients(image: UploadFile = File(...)):
#     #이미지 파일을 모델에 전달하는 로직
#     # ingredients = 내함수(file)
#     ingredients = ["eggs","milk"]
#     return {"ingredients": ingredients}

@app.post("/upload-and-recognize/")
async def upload_and_recognize(image: UploadFile = File(...)):
    # 이미지 파일을 받습니다.
    # file.filename을 사용하여 파일 이름을 얻을 수 있습니다.

    # 여기에서 이미지 파일을 모델에 전달하는 로직을 구현합니다.
    # 예시로, 모델이 'eggs', 'milk'를 감지했다고 가정합니다.
    ingredients = ["eggs", "milk"]

    # 파일 이름과 인식된 재료 목록을 반환합니다.
    return {"ingredients": ingredients}



#사용자에게 다시 보내서 재료 확인받기
@app.post("/confirm-ingredients/")
async def confirm_ingredients(ingredients: List[str]):
    # 사용자가 선택한 재료 목록을 처리합니다.FE에서
    # 예를 들어, 데이터베이스에 저장하거나, 레시피 추천 로직에 사용할 수 있습니다.
    return {"ingredients": ingredients}

#재료리스트 DB에 저장
@app.post("/save-ingredients/")
async def save_ingredients(ingredients: List[str], db: Session = Depends(get_db)):
    for ingredient_name in ingredients:
        db_ingredient = Ingredient(name=ingredient_name)
        db.add(db_ingredient)
    db.commit()
    return {"message": "Ingredients saved successfully"}
    
#레시피 추천 기능
@app.post("/recommend-recipes/")
async def recommend_recipes(request: RecipeRequest, db: Session = Depends(get_db)):
    # 데이터베이스에서 재료 목록 검색
    ingredients = db.query(Ingredient).all()

    # GPT API에 레시피 추천 요청
    recommended_recipes = gpt.call_gpt_api(ingredients, request.additional_info)

    # 추천된 레시피 목록 반환
    return {"recipes": recommended_recipes}

#이 클래스는 왜 있는지 이해가 안됨

@app.post("/get-detailed-recipe/")
async def get_detailed_recipe(selection: str):
    detailed_recipe, ingredients = await gpt.call_gpt_api_for_recipe(selection.selected_recipe)
    # 상세 레시피 정보를 반환
    return {"detailed_recipe": detailed_recipe, "ingredients": ingredients}

#삭제할 ingredients 사용자가 골라서 다시 보내줌

# 사용자가 선택한 재료들을 데이터베이스에서 삭제하는 API
@app.post("/delete-ingredients/")
async def delete_ingredients(to_delete: IngredientsToDelete, db: Session = Depends(get_db)):
    for ingredient_name in to_delete.ingredients:
        ingredient = db.query(Ingredient).filter(Ingredient.name == ingredient_name).first()
        if ingredient:
            db.delete(ingredient)
    db.commit()
    return {"message": "Ingredients deleted successfully"}

@app.get("/ingredients/", response_model=List[str])
async def read_ingredients(db: Session = Depends(get_db)):
    ingredients = db.query(Ingredient).all()
    return [ingredient.name for ingredient in ingredients]




#CORS설정
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"], #모든 도메인에서의 접근 허용
    allow_credentials = True,
    allow_methods = ["*"], #모든 HTTP 메소드 허용
    allow_headers = ["*"], # 모든 헤드를 허용
)

#전체 API라우팅 설정


#API 문서 자동화
# from fastapi.openapi.utils import get_openapi

# def custom_openapi():
#     if app.openapi_schema:
#         return app.openapi_schema
#     openapi_schema = get_openapi(
#         title = "Your Project",
#         version = "1.0.0",
#         description= "API documentation for your project",
#         routes = app.routes,
#     )
#     app.openapi_shema = openapi_schema
#     return app.openapi_schema

# app.openapi = custom_openapi

#예외처리
from fastapi import HTTPException

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    if item_id not in items:
        raise HTTPException(status_code = 404, detail = "Item not found")
    return {"item": items[item_id]}



#서버실행
#uvicorn main:app --reload
#서버 배포 찾아보기?
