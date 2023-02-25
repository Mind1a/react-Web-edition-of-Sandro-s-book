import React, { useState } from "react";
import styles from "./Contents.module.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { FliperBook } from "../../components/FliperBook";
import { bookData } from "../../bookData";
import { useNavigate } from "react-router-dom";

const contentVariants = {
  visible: {
    scale: 1.1,
    transition: {
      ease: "linear",
      duration: 0.1,
    },
  },
};
export const Contents = () => {
  const [contentPart, setContentPart] = useState("content");
  const navigate = useNavigate();

  return (
    <div className={styles.contentPage}>
      <Loader width={["0%", "100%"]} />
      <div className={styles.contents}>
        <motion.div
          variants={contentPart === "content" && contentVariants}
          initial="hidden"
          animate="visible"
          onClick={() => setContentPart("content")}
          className={styles.contentTitles}
        >
          სარჩევი
        </motion.div>
        <motion.div
          variants={contentPart === "aboutProject" && contentVariants}
          initial="hidden"
          animate="visible"
          onClick={() => setContentPart("aboutProject")}
          className={styles.contentTitles}
        >
          პროექტის შესახებ
        </motion.div>
        <motion.div
          variants={contentPart === "bookPdfVersion" && contentVariants}
          initial="hidden"
          animate="visible"
          onClick={() => setContentPart("bookPdfVersion")}
          className={styles.contentTitles}
        >
          წიგნის PDF ვერსია
        </motion.div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.closeContent} onClick={() => navigate(-1)}>
          <img src="assets/svgs/content-chapter-svg/closeBtn.svg" alt="" />
        </div>
        {contentPart === "content" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={styles.contentChapter}
          >
            {Object.entries(bookData).map(
              ([book, { img, imgWidth, imgHeight, title }]) => (
                <div key={book} className={styles.Chapter}>
                  <Link
                    className={styles.chapterRoute}
                    to={book === "preface" ? `/${book}` : `/books/${book}`}
                  >
                    <img
                      src={img}
                      alt={title}
                      width={imgWidth}
                      height={imgHeight}
                    />
                    <span>{title}</span>
                  </Link>
                </div>
              )
            )}
          </motion.div>
        )}
        {contentPart === "aboutProject" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={styles.aboutProject}
          >
            <h3>პროექტის შესახებ</h3>
            <div className={styles.aboutTexts}>
              <p className={styles.aboutText}>
                როცა წიგნი გვახსენდება, ქაღალდის ფურცელზე დაბეჭდილი ობიექტი
                წარმოგვიდგება, მაგარ ან რბილ ყდაში აკინძული. ეს ჩვენი წარმოდგენა
                დღეს შეიძლება საერთოდ აღარ შეესაბამებოდეს რეალობას. დღეს წიგნს
                ხშირად ფაილის სახე აქვს. ასეთ წიგნს საერთოდ არ გააჩნია
                მატერიალური გარსი. ის მხოლოდ კომპიუტერულ მოწყობილობაში ჩაწერილი
                ბინარული მონაცემების სახით არსებობს. მისი ფორმა იმ მოწყობილობით
                არის განპირობებული, რომელშიც თავად წიგნია ჩატვირთული.
              </p>
              <p className={styles.aboutText}>
                კაცობრიობის განვითარების სხვადასხვა პერიოდში წიგნს განსხვავებული
                სახით გამოსცემდნენ. უძველესი შუმერული წიგნები თიხის ფირფიტებისა
                იყო. ჩვენი გადმოსახედიდან, ისინი აგურებს უფრო ჰგვანან ვიდრე
                წიგნებს. ეგვიპტელები წიგნებს პაპირუსზე წერდნენ, მასალიდან
                გამომდინარე, ასეთ წიგნებს გრძელი გრაგნილების სახე ჰქონდათ.
                შუასაუკუნეების ხელნაწერი წიგნები, ფოლიანტები, ძალიან დიდი ზომისა
                იყო. ასეთ წიგნთან ერთად შენს ოთახში ვერ განმარტოვდებოდი, ასეთ
                წიგნს მუხლებზე ვერ დაიდებდი, მათ სპეციალურად მოწყობილ მაგიდებზე
                დებდნენ და ისე კითხულობდნენ.
              </p>
              <p className={styles.aboutText}>
                წიგნის გარეგანი ფორმის ცვლილებასთან ერთად იცვლებოდა წიგნის
                ავტორი, მისი გამომცემელი და წიგნის მკითხველი. იცვლებოდა თავად
                ამბავიც რომელსაც წიგნი ყვება. არ იცვლება ის უსაზღვრო
                შესაძლებლობები რომელსაც წიგნი გვაძლევს. ვიმოგზაუროთ იქ სადაც არ
                ვყოფილვართ, გავხდეთ თანაზიარი იმ ამბებისა რომელიც ჩვენ არ
                გადაგვხდენია თავს. გავიზიაროთ აზრები რომელსაც ავტორი გვთავაზობს.
              </p>
              <p className={styles.aboutText}>
                ეს წიგნი, წიგნის ინტერნეტ გამოცემაა. ამ წიგნით მოყოლილი ამბები
                ტექნოლოგიებსა და თანამედროვე ადამიანის მაგიურ შესაძლებლობებზეა.
                ამ წიგნის ქაღალდზე დაბეჭდილი ვერსია არ არსებობს, წიგნში
                მოთხრობილი ამბების წაკითხვა, მოსმენა მხოლოდ ტექნოლოგიების
                წყალობით არის შესაძლებელი.
              </p>
            </div>
          </motion.div>
        )}
        {contentPart === "bookPdfVersion" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={styles.contentPdfPage}
          >
            <FliperBook />
            <div className={styles.pdfContent}>
              <h3>
                გადმოიწერე წიგნის <span>PDF</span> ვერსია
              </h3>
              <div className={styles.downloadPDF}>
                <a
                  href="https://fromchaostocosmos.sandroasatiani.com/SandroAsatiani_ChaosidanCosmosamde.pdf"
                  target="_blank"
                >
                  <img
                    src="assets/svgs/content-chapter-svg/PDFBookDownload.svg"
                    alt="pdfBook"
                  />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
