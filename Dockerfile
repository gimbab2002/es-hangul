# ✅ Node.js 20 기반
FROM node:20

# ✅ corepack을 통해 yarn 4.1.1 활성화
RUN corepack enable && corepack prepare yarn@4.1.1 --activate

# ✅ git 및 locale 관련 패키지 설치
RUN apt-get update && \
    apt-get install -y git vim locales && \
    locale-gen ko_KR.UTF-8 
    

# ✅ 한국어 로케일 설정
ENV LANG=ko_KR.UTF-8
ENV LANGUAGE=ko_KR:ko
ENV LC_ALL=ko_KR.UTF-8

# ✅ 기본 쉘을 bash로 진입
ENTRYPOINT [ "/bin/bash" ]