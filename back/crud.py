#CRUD작업
from sqlalchemy.orm import Session

def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def create_user(db: Session, user: UserCreate):
    fake_hashed_password = user.password + "notreallyhashed" #아마 찐 해쉬로 진행하지 않나봄
    db_user = User(email = user.email, hashed_password = fake_hashed_password)
    db.add(db.user)
    db.commit()
    db.refresh(db_user)
    return db_user