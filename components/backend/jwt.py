from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from jose import JWTError, jwt
import bcrypt
import json

# Load configuration
with open('config.json', 'r', encoding='utf-8') as f:
    config = json.load(f)

# FastAPI app and OAuth2 scheme
app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Database setup
DATABASE_URL = config['db_link']
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Models
class User(Base):
    __tablename__ = 'users'
    user_id = Column(Integer, primary_key=True, index=True)
    user_fname = Column(String(50), nullable=False)
    user_lname = Column(String(50), nullable=False)
    user_mi = Column(String(10))
    user_img_link = Column(String(100))
    user_email = Column(String(100), unique=True, nullable=False)
    user_pswd = Column(String(100), nullable=False)
    user_isactive = Column(Boolean(), default=True)
    user_use_ai = Column(Boolean(), default=True)

# JWT settings
SECRET_KEY = config['jwtsecretkey']
ALGORITHM = "HS256"

# Dependency for getting the current user
def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return user_id

# Models for request and response
class LoginRequest(BaseModel):
    useremail: str
    password: str

class LoginResponse(BaseModel):
    message: str
    access_token: str = None

# CRUD operation
def get_user(db: Session, user_email: str):
    return db.query(User).filter(User.user_email == user_email).first()

def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.user_id == user_id).first()

# Routes
@app.post("/token", response_model=LoginResponse)
def login(request: LoginRequest, db: Session = Depends(SessionLocal)):
    user = get_user(db, request.useremail)
    if user and bcrypt.checkpw(request.password.encode('utf-8'), user.user_pswd.encode('utf-8')):
        access_token = jwt.encode({"sub": user.user_id}, SECRET_KEY, algorithm=ALGORITHM)
        return {"message": "Login Success", "access_token": access_token}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")

@app.get("/get_name")
def get_name(current_user: int = Depends(get_current_user), db: Session = Depends(SessionLocal)):
    user = get_user_by_id(db, current_user)
    if user:
        return {"message": "User found", "name": user.user_fname}
    else:
        raise HTTPException(status_code=404, detail="User not found")

# Create the database tables
@app.on_event("startup")
def startup_event():
    Base.metadata.create_all(bind=engine)
