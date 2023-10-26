import { useState, useEffect } from "react";

const useMediaQuery = (query: string) => {
  // matches값이 true면, query값이 미디엄 스크립 값보다 큰 상태이다.
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // 뷰포트 너비가 query값과 일치하지 않는 경우 matches 갱신
    if(media.matches !== matches){
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    
    return () => window.removeEventListener("resize", listener);
    
  },[matches, query])
  
  return matches;
}

export default useMediaQuery;