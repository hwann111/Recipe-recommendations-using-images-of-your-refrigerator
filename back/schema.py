from pydantic import BaseModel
from typing import List

class IngredientsToDelete(BaseModel):
    ingredients: List[str]  # 사용자가 삭제할 재료 리스트
    
    #요리 선택 및 레시피 제공
class RecipeSelection(BaseModel):
    selected_recipe: str  # 사용자가 선택한 레시피 이름
    
class RecipeRequest(BaseModel):
    additional_info: str  # 사용자로부터 받은 추가 정보