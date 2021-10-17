import os
import random
import string
import subprocess
import shutil

from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from .serializers import CodeSerializer


class CodeViewSet(viewsets.ViewSet, generics.CreateAPIView):
    serializer_class = CodeSerializer

    def create(self, request, *args, **kwargs):
        enum = ['python', 'java', 'javascript']
        file_in = '/input.txt'
        file_out = '/result.txt'
        folder = ''
        source = request.data
        lang = source.get('language')
        letters = string.ascii_lowercase
        img = (''.join(random.choice(letters) for i in range(10)))
        if lang == "python":
            folder = "./docker/python"
            file_script = "main.py"
        elif lang == "java":
            folder = "./docker/java"
            file_script = "main.java"
        elif lang == "javascript":
            folder = "./docker/javascript"
            file_script = "main.js"
        elif lang not in enum:
            return Response({
                "content": "unknown language"
            }, status=status.HTTP_404_NOT_FOUND)
        root = folder + '/' + img
        os.mkdir(root)
        path_script = root + '/' + file_script
        path_in = root + file_in
        path_out = root + file_out
        shutil.copy('./docker/python/Dockerfile', root)
        shutil.copy('./docker/python/entrypoint.sh', root)
        with open(path_script, "w") as src, open(path_in, "w") as input:
            src.writelines(source.get('source'))
            input.writelines(source.get('input'))
        # Build docker image
        docker_img_cmd = 'docker image build ' + root + ' -t ' + img
        print(docker_img_cmd)
        subprocess.run(docker_img_cmd,
                       shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        # Run docker image and write output to file result.txt
        with open(path_out, "wb") as out, open(path_out, "wb") as err:
            subprocess.run("docker run --rm " + img,
                           shell=True, stdout=out, stderr=err)
        # Read output from result file text
        with open(path_out) as f:
            contents = f.read()
        # Remove docker image
        subprocess.run('docker rmi ' + img,
                       shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

        # Remove all file after finish
        shutil.rmtree(root)
        return Response(
            {
                "source": source.get('source'),
                "input": source.get('input'),
                "output": contents,
            }, status=status.HTTP_200_OK
        )
