'use client'
import { useEffect, useState, Dispatch, SetStateAction } from "react";

import styles from "./page.module.scss";
import getUserID from "./api/auth/getUserId";
import reportedFieldOfStudy from "./components/has-answerd-question/has-answerd-question";
import registerUserCourse from "@/app/components/register-user-course/register-user-course"


type BoolSetUseState = Dispatch<SetStateAction<boolean>>

async function regUser(courseName: string, setReportedFieldOfStudy:BoolSetUseState) {
  await registerUserCourse(courseName)
  setReportedFieldOfStudy(true)
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hasAnswerdQuestion, setHasAnswerdQuestion] = useState(true)

  useEffect(() => {
    async function getData() {
      const userID = await getUserID()
      if (!userID) {
        console.log("not logged in")
        return;
      }
      setIsLoggedIn(true)
      const hasAnswerd_response = await reportedFieldOfStudy(userID)
      console.log(hasAnswerd_response)
      setReportedFieldOfStudy(hasAnswerd_response)
    }
    getData()
  }, [reportedFieldOfStudy])


  if (isLoggedIn) {
    if (reportedFieldOfStudy) {
      console.log("logged in and answerd")
    }
    else {
      return (
        <div className={styles.mainDivStat}>
          <h1 className={styles.statTitle}>Hvilket studieløp går du? Dette er for stattestikk.</h1>
          <div className={styles.answerButtonsDiv}>
            
            <div className={styles.buttonDivsAnswer}>
            <button onClick={e => (regUser("elsys", setReportedFieldOfStudy))} className={styles.questionButton}>ELSYS</button>
            </div>
            
            <div className={styles.buttonDivsAnswer}>
            <button onClick={e => (regUser("kyb", setReportedFieldOfStudy))} className={styles.questionButton}>KYB</button>
            </div>
            
            <div className={styles.buttonDivsAnswer}>
            <button onClick={e => (regUser("other", setReportedFieldOfStudy))} className={styles.questionButton}>Annet</button>
            </div>
            
          </div>
        </div>);
    }
  }
  return (
    <div>
      <p>Hovedside</p>
    </div>
  );
}
