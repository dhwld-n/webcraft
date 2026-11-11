# webcraft

짧은 요청만으로 디자인과 애니메이션이 들어간 웹사이트 시드 결과물을 만들어 주는 Claude Code 플러그인입니다. 스타일 카드, 레퍼런스 느낌 노트, 모션 레시피, 무료 폰트 목록에서 재료를 고르고, 만든 페이지를 검수 에이전트들이 채점해 고칩니다.

자세한 설명과 구성은 [webcraft/README.md](webcraft/README.md)에 있습니다.

## 설치

Claude Code에서:

```
/plugin marketplace add dhwld-n/webcraft
/plugin install webcraft@dhwld-n
```

설치한 뒤에는 그냥 말로 요청하면 됩니다.

```
동네 도넛 가게 홈페이지를 만들어줘. 70년대 간판처럼 따뜻하고 유쾌한 느낌으로.
```

브라우저 도구가 있으면 레퍼런스 측정과 화면 검수까지 하고, 없으면 코드만 보고 검수합니다.

## 알아 둘 것

- 레퍼런스 노트는 공개된 사이트를 보고 적은 느낌과 수치입니다. 그 사이트의 코드, 이미지, 문구는 담지 않았고, 만들 때도 가져오지 않습니다.
- 폰트 목록은 무료 폰트만 자동 후보로 씁니다. 각 폰트의 라이선스는 원래 배포처의 조건을 따릅니다.
- 앱 화면 데모는 설치되어 있으면 [stageshow](https://benji.org/stageshow) 스킬(MIT)을 씁니다. 이 저장소에는 stageshow가 들어 있지 않습니다.

## 라이선스

MIT. [LICENSE](LICENSE)를 보세요.
