from fastapi import FastAPI

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

from fastapi import File, UploadFile

app = FastAPI()

#루트 URL 요청 
@app.get("/")
def read_root():
    return{"Hello": "World"}


#사용자 인증 API구현, 로그인 및 회원가입기능을 위한 API
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.post("/token")
def token():
    return {"token": "fake-token"}

@app.get("/user/me")
def read_users_me(token: str = Depends(oauth2_scheme)):
    return{"token":token}

#이미지 데이터 처리 API구현->File()안에 뭐 들어갈지 해결하기
# @app.post("/uploadfile/")
# async def create_upload_file(file: UploadFile = File('image.jpg'))
#     return {"filename": file.filename}

#재료 인식 AI 모델 통합
@app.post("/recognize-ingredients/")
async def recognize_ingredients(image: UploadFile):
    #AI 모델 호출하는 코드
    return ["ingredient1", "ingredient2"]

#레시피 추천 기능 구현(다른 파일로 만들어도 좋을 듯)
def recomment_recipes(ingredients):
    #gpt API 호출 + 레시피 추천하는 코드
    return ["recipe1", "recipe2"]

#전체 API라우팅 설정

#서버실행
#uvicorn main:app --reload

#인공지능 모델과 API통합
