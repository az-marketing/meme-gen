import Image from "next/image";
import styles from "./page.module.css";
import Meme from "./components/Meme/Meme";

export default function Home() {
  return (
    <main className={styles.main}>
      <Meme />
    </main>
  );
}
