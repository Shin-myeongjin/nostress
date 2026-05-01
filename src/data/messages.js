// 랜덤 위로 메시지 목록
export const comfortMessages = [
  { title: "오늘 정말 고생했다 🥹", body: "이만큼 버텨낸 것만으로도 충분해.\n넌 생각보다 훨씬 강한 사람이야." },
  { title: "힘들었지? 다 알아 😔", body: "그 마음 다 털어버렸으니까\n내일은 조금 더 가벼울 거야." },
  { title: "오늘도 잘 살아냈네 ✨", body: "스트레스 받으면서도\n버텨준 오늘의 너, 진짜 멋지다." },
  { title: "날려버렸다, 시원하지? 🌬️", body: "그 무거운 거 들고 하루 종일 다녔구나.\n이제 좀 내려놔도 돼." },
  { title: "충분히 화나도 돼 🔥", body: "감정은 틀린 게 아니야.\n실컷 털어냈으니 이제 좀 쉬어." },
  { title: "이 정도면 프로야 😤", body: "이만큼 스트레스를 버텼다고?\n강철 멘탈 인정." },
  { title: "다 날아갔다! 👋", body: "걱정도, 짜증도, 다 같이 날려버렸어.\n오늘 밤은 편하게 자." },
  { title: "네 감정은 소중해 💛", body: "힘들다고 느끼는 게 당연한 거야.\n오늘 하루도 정말 수고했어." },
];

export const getRandomMessage = () => {
  return comfortMessages[Math.floor(Math.random() * comfortMessages.length)];
};
