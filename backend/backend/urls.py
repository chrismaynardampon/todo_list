from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter # type: ignore
from todo.views import TodoItemViewSet

router = DefaultRouter()
router.register('todos', TodoItemViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
