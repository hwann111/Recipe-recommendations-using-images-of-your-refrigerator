#데이터 베이스 연동
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# SQLALCHEMY_DATABASE_URL ="sqlite:///./test.db"
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:990521@0.0.0.0:8000/refridb"
#주소 아마 변경해야할듯?

engine = create_engine(
    SQLALCHEMY_DATABASE_URL 
)

SessionLocal = sessionmaker(autocommit = False, autoflush=False, bind = engine)

Base = declarative_base() #?