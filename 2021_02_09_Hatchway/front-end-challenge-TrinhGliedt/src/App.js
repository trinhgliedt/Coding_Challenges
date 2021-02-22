import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [allStudents, setAllStudents] = useState(null);
  const [students, setStudents] = useState(null);
  const [filteredStudents, setFilteredStudents] = useState(null);
  const [activeCards, setActiveCards] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [currentTagIndex, setCurrentTagIndex] = useState(null);
  const [nameSearchString, setNameSearchString] = useState("");
  const [tagSearchString, setTagSearchString] = useState("");

  useEffect(() => {
    axios.get("https://api.hatchways.io/assessment/students").then((res) => {
      // console.log(res.data["students"]);
      var studentsCopy1 = [...res.data["students"]];
      studentsCopy1.map((student) => {
        student.tags = [];
      });
      setStudents(res.data["students"]);
      setAllStudents([...studentsCopy1]);
      setFilteredStudents([...studentsCopy1]);
    });
  }, []);

  useEffect(() => {
    if (allStudents !== null) {
      setStudents(
        allStudents.filter((student) => {
          const foundName = String(student.lastName + student.firstName)
            .toLowerCase()
            .includes(nameSearchString.toLowerCase());
          const foundTag = student.tags
            .toString()
            .toLowerCase()
            .includes(tagSearchString.toLowerCase());
          return foundName && foundTag;
        })
      );
    }
  }, [nameSearchString, tagSearchString]);
  const searchByName = (studentArray, searchFor) => {
    if (searchFor === "") {
      setStudents(studentArray);
    }
    setNameSearchString(searchFor);
    setFilteredStudents(
      studentArray.filter((student) => {
        return String(student.lastName + student.firstName)
          .toLowerCase()
          .includes(searchFor.toLowerCase());
      })
    );
  };

  const searchByTag = (studentArray, searchFor) => {
    if (searchFor === "") {
      setStudents(studentArray);
    }
    setTagSearchString(searchFor);
    setFilteredStudents(
      studentArray.filter((student) => {
        return student.tags
          .toString()
          .toLowerCase()
          .includes(searchFor.toLowerCase());
      })
    );
  };

  const handleOpen = (studentIndex) => {
    if (!activeCards.includes(studentIndex)) {
      setActiveCards([...activeCards, studentIndex]);
    }
  };
  const handleClose = (studentIndex) => {
    var index = activeCards.indexOf(studentIndex);
    if (index !== -1) {
      var newActiveCards = [...activeCards];
      newActiveCards.splice(index, 1);
      setActiveCards(newActiveCards);
    }
  };
  const handleAddTag = (newTag, studentIndex) => {
    var studentsCopy = [...students];
    var currentStudent = studentsCopy[studentIndex];
    if (!currentStudent.hasOwnProperty("tags")) {
      currentStudent["tags"] = [newTag];
    } else {
      currentStudent.tags.push(newTag);
    }
    setNewTag("");
    setAllStudents(studentsCopy);
    // console.log("studentIndex: ", studentIndex);
  };
  // console.log(allStudents);
  if (students === null) return "Loading.....";
  return (
    <div className="App">
      <div className="wrapper">
        <input
          className="searchInput"
          type="text"
          value={nameSearchString}
          placeholder="Search by name"
          onChange={(event) => setNameSearchString(event.target.value)}
        ></input>
        <input
          className="searchInput"
          type="text"
          value={tagSearchString}
          placeholder="Search by tag"
          onChange={(event) => setTagSearchString(event.target.value)}
        ></input>
        {students.map((student, studentIndex) => {
          return (
            <div className="card" key={studentIndex}>
              <div className="leftDiv">
                <img src={student.pic} width="100%" alt="student" />
              </div>
              <div className="rightDiv">
                <h1>
                  {student.firstName} {student.lastName}
                </h1>
                <div className="extraMargin">
                  <p>Email: {student.email}</p>
                  <p>Company: {student.company}</p>
                  <p>Skill: {student.skill}</p>
                  <p>
                    Average:{" "}
                    {eval(student.grades.join("+")) / student.grades.length}%
                  </p>
                  {activeCards.includes(studentIndex) && (
                    <div className="grades">
                      {student.grades.map((grade, gradeIndex) => {
                        return (
                          <p key={gradeIndex}>
                            Test {gradeIndex + 1}: {grade}%
                          </p>
                        );
                      })}
                    </div>
                  )}
                  <p>
                    {student.hasOwnProperty("tags") &&
                      student.tags.map((tag, tagIndex) => {
                        return (
                          <span key={tagIndex} className="tag">
                            {tag}
                          </span>
                        );
                      })}
                  </p>

                  <input
                    className="tagInput"
                    value={currentTagIndex === studentIndex ? newTag : ""}
                    placeholder="Add a tag"
                    onChange={(event) => {
                      setCurrentTagIndex(studentIndex);
                      setNewTag(event.target.value);
                    }}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        handleAddTag(newTag, studentIndex);
                      }
                    }}
                  ></input>
                </div>
              </div>
              {!activeCards.includes(studentIndex) && (
                <div
                  className="controlButton plus"
                  onClick={(e) => {
                    handleOpen(studentIndex);
                  }}
                ></div>
              )}
              {activeCards.includes(studentIndex) && (
                <div
                  className="controlButton minus"
                  onClick={(e) => {
                    handleClose(studentIndex);
                  }}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
