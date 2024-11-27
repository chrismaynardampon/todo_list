from rest_framework.viewsets import ModelViewSet # type: ignore
from .models import TodoItem
from .serializers import TodoItemSerializer

class TodoItemViewSet(ModelViewSet):
    queryset = TodoItem.objects.all()
    serializer_class = TodoItemSerializer
