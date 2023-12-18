#모델 정의
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from back.database import Base, engine

#사용자 정보 저장 하는 클래스
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique= True, index= True)
    hashed_password = Column(String)
    items = relationship("Item", back_populates="owner")
    
# class Ingredients(Base):
#     __tablename__ = "ingredients"
    
#     ingredients = Column(String,primary_key= True)
    
class Ingredient(Base):
    __tablename__ = "ingredients"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)

# 데이터베이스 테이블 생성
Base.metadata.create_all(bind=engine)
 