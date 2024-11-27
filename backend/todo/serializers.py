from rest_framework.serializers import ModelSerializer # type: ignore
from .models import TodoItem

class TodoItemSerializer(ModelSerializer):
    class Meta:
        model = TodoItem
        fields = '__all__'
