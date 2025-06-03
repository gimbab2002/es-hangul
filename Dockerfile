FROM node:18

# corepack 활성화 및 yarn 버전 지정
RUN corepack enable && corepack prepare yarn@4.1.1 --activate

# 필수 도구 설치
RUN apt-get update && apt-get install -y git

# 이후 컨테이너 접속해서 git clone, yarn install 등을 직접 수행
CMD ["bash"]
