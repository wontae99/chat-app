# 개발 목표

**React-Native** 를 사용하고 discord ui/ux 를 cloning 한 모바일 채팅 어플리케이션 개발. 


<br>

# DEMO

![ui](https://github.com/wontae99/nextjs-movie-project/assets/109476712/6e184bfb-fc64-4a48-991b-91fcc319819f)

<br>

# 기술 스택

<div align="center">
	<img src="https://img.shields.io/badge/JavaScript-007396?style=flat&logo=javascript&logoColor=#000" />
    <img src="https://img.shields.io/badge/React-3e5661?style=flat&logo=react&logoColor=#000" />
    <img src="https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=#000" />
</div>
<br>

# Features & Functions

- ## **계정 생성**

1. Firebase Authentication 백앤드에 계정 저장.
2. 입력된 이메일과 유저네임을을 가진 유저를 stream chat 백앤드에 생성.

![signup](https://github.com/wontae99/nextjs-movie-project/assets/109476712/2f0528d0-4b3f-4c70-9efa-fac8b6711ede)

<br><br>

- ## 로그인

![auto-login](https://github.com/wontae99/nextjs-movie-project/assets/109476712/24059937-f207-425f-b1f6-a078f736908d)

Async Storage를 사용하여 로그인시에 디바이스에 계정을 저장하여 로그아웃 하기 전까지 재접속시 자동으로 로그인됨
<br><br>

- ## 메시지 시스템

![messaging](https://github.com/wontae99/nextjs-movie-project/assets/109476712/8411ed8f-9d19-4396-a16d-dcae1214dce6)

https://getstream.io/chat/docs/

stream chat api 사용하여 채팅 시스템 구축.
저장된 유저에게 메시지/사진/gif 등을 보낼 수 있으며 채팅 방 안의 유저들을 drawer navigation으로 볼 수 있음.
<br><br>

- ## 유저 프로필 변경

유저네임 변경시: stream chat에 저장된 유저의 닉네임 변경
<br><br>
Email 변경시: firebase authentication에서 보내는 token을 refresh하기 위해서 비밀번호 재입력. 그 후 firebase에 저장된 유저 이메일 변경.

![change-profile](https://github.com/wontae99/nextjs-movie-project/assets/109476712/59460dda-6044-4836-99d1-af8ee0ebbb57)


<br><br>

# 개선사항

- 유저 프로필 변경시에 유저 사진을 변경 할 수 없는 점<br>
➡ 업로드 될 사진을 저장할 백앤드를 사용하면 되는 부분이지만 해당 프로젝트에선 생략함.

- 해당 프로젝트에선 빠른 개발을 위해서 chat api의 기능/ui 컴포넌트/백앤드를 사용하여 유저 계정 정보 및 채팅 같은 정보를 서로 다른 백앤드에 저장하게 되었음<br>
➡ aws amplify 와 같은 백앤드를 사용했다면 유저/채팅들을 저장할 백앤드를 구축할 수 있을것으로 생각됨.