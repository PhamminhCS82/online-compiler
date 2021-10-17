from rest_framework.serializers import ModelSerializer

from .models import Code


class CodeSerializer(ModelSerializer):
    class Meta:
        model = Code
        fields = ['source', 'language', 'input']