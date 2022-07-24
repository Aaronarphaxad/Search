import { useState } from "react";
import AddIcon from "../../assets/Add";
import SubtractIcon from "../../assets/Subtract";
import { getAverage } from "../../helpers/getAverage";
import styles from "./StudentComponent.module.css";

// Tag button
const TagButton = ({ tag }) => {
  return <div className={styles.tagBtn}>{tag}</div>;
};

// STUDENT COMPONENT
const StudentComponent = ({ obj, handleTagAdd }) => {
  const { pic, company, email, firstName, skill, grades, lastName, id } = obj;
  const [color, setColor] = useState("grey");
  const [open, setOpen] = useState(false);
  const [tag, setTag] = useState("");

  const handleHover = () => {
    color === "black" ? setColor("grey") : setColor("black");
  };

  const handleOpen = () => {
    setOpen((prev) => (prev = !prev));
  };

  const handleAddTag = ({ id }) => {
    handleTagAdd({ id, tag });
    setTag("");
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.profilePic}>
          <img src={pic} alt="img" height="80px" />
        </div>
        <div className={styles.profileInfo}>
          <h2>
            {firstName} {lastName}
          </h2>
          <p>Email: {email}</p>
          <p>Company: {company}</p>
          <p>Skill: {skill}</p>
          <p>Average: {getAverage(grades)}%</p>
        </div>
        <div className={styles.toggle}>
          {open ? (
            <span
              onMouseLeave={handleHover}
              onMouseOver={handleHover}
              onClick={handleOpen}
            >
              <SubtractIcon color={color} />
            </span>
          ) : (
            <span onMouseOver={handleHover} onClick={handleOpen}>
              <AddIcon color={color} />
            </span>
          )}
        </div>
      </div>
      {open && (
        <div
          className={styles.gradeDiv}
          style={{ height: open ? "max-content" : "0" }}
        >
          {grades.map((grade, index) => {
            return (
              <p>
                Grade {index + 1}: {grade}%
              </p>
            );
          })}
        </div>
      )}

      <div className={styles.gradeDiv}>
        <div className={styles.gtag}>
          {obj?.tags?.map((usertag) => (
            <TagButton tag={usertag.label} key={usertag.id} />
          ))}
        </div>
        <input
          value={tag}
          className={styles.search}
          onChange={(e) => setTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTag({
                id,
              });
            }
          }}
          placeholder="Add tag"
        />
      </div>
    </div>
  );
};

export default StudentComponent;
