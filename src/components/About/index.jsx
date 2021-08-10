import React from "react";
import styles from "./about.module.scss";
import { Image, Collapse, Typography, Tooltip , Row , Col} from "antd";
import {
  GithubFilled,
  InstagramFilled,
  LinkedinFilled,
  MailFilled,
  SkypeFilled,
} from "@ant-design/icons";
import useWindowSize from "../../hooks/useWindowSize";
import Title from "../../Seo/Title";

const { Panel } = Collapse;
const { Link, Text } = Typography;


const Link_Logo_Styles = {
  fontSize: "2rem",
  margin: "0 10px",
  color: "black",
};

const Introduce_Text_Styles = {
  display: "block",
  fontSize: "1.3rem",
};

const Text_Details_Styles = {
  background: "rgb(91, 255, 50)"
}

const About = () => {

  const width = useWindowSize()
  const calculateWidth = ()=>{
    if(width>1000){
      return 700
    }else if(width > 700){
      return 600
    }else if(width <= 700){
      return 300
    }
  }
  return (
    <div id={styles.container}>
      <Title title="About" description="about page" />
      <section>
        <aside>
        <Image src="pic4-min.jpeg" width={300} id="imageMe" />

        </aside>
        <main>
        <Collapse
          accordion={true}  
          defaultActiveKey={"1"}
          style={{width:calculateWidth(),margin:"auto" , direction: "rtl",background: "#aba8cc"}}
        >
          <Panel header={"معرفی"} key="1">
            <Text style={Introduce_Text_Styles}>
              مهدی رباط جزی اصالتا اهل خراسان رضوی بزرگ شده قم ساکن تهران،
            </Text>
            <Text style={Introduce_Text_Styles}>
              عاشق برنامه نویسی و تکنولوژی های سمت وب و جاوااسکریپت ،
            </Text>
            <Text style={Introduce_Text_Styles}>
              این پروژه دوره فرانت مپصا بوت کمپ است ،
            </Text>
            <Text>
              <small style={Text_Details_Styles}>
                برای استفاده بهتر و بهره وری بیشتر لطفا در سایت{" "}
                <Tooltip placement="left" title="https://www.themoviedb.org/">
                <Link href="https://www.themoviedb.org/" target="_blank">
                  TMDB
                </Link>
                </Tooltip>{" "}
                ثبت نام بفرمایید و در اینجا لاگین کنید
              </small>
            </Text>
          </Panel>
          <Panel header={"اینو با چی درست کردم؟"} key="2">
            <ol style={{ fontSize: "1.3rem" }}>
              <li>ری اکت</li>
              <li>کاستوم هوک</li>
              <li>کانتکست</li>
              <li>انت دیزاین</li>
              <li>ای پی آی سایت تی ام دی بی</li>
            </ol>
          </Panel>
          <Panel header={"چیا بلدم ؟؟"} key="3">
            <ul style={{ fontSize: "1.3rem" }}>
              <li>جاوااسکریپت ES6 , ES5 , ...</li>
              <li>تاحد قابل قبولی الگوریتم نویسی</li>
              <li>ری اکت</li>
              <li>ریداکس</li>
              <li>کانتکست</li>
              <li>ای پی آی نویسی</li>
              <li>دیزاین صفحات وب </li>
              <li>چیزای دیگه</li>
            </ul>
          </Panel>
          <Panel header={"لینک های من"} key="4">
            <Link
              href="https://www.instagram.com/mahdi._.robatjazi/"
              target="_blank"
            >
              <InstagramFilled style={Link_Logo_Styles} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/mehdirobatjazi"
              target="_blank"
            >
              <LinkedinFilled style={Link_Logo_Styles} />
            </Link>
            <Link
              href="https://join.skype.com/invite/op1fkBia0ShO"
              target="_blank"
            >
              <SkypeFilled style={Link_Logo_Styles} />
            </Link>
            <Link href="https://github.com/MEHDI-ROBATJAZI" target="_blank">
              <GithubFilled style={Link_Logo_Styles} />
            </Link>
              <MailFilled style={Link_Logo_Styles} onClick={()=>alert(`my email : realmehdi1999m@gmail.com`)} />
            
          </Panel>
        </Collapse>
        </main>
      </section>
    </div>
  );
};

export default About;
