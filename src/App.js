import { useMemo, useState } from "react";
import "./App.css";
import StudentComponent from "./components/Student/StudentComponent";
import { useFetchData } from "./hooks/fetchData";

function App() {
  const { studentData, error, loading, setData } = useFetchData();
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [tagLookup, setTagLookup] = useState({});

  const filterStudentsList = useMemo(() => {
    /**
     * fetch student list when name changes
     */

    let searchResults = studentData;

    /**
     * handle search by name alone
     */

    searchResults = studentData?.filter((student) =>
      `${student.firstName} ${student.lastName}`
        .toLowerCase()
        .includes(name.toLowerCase())
    );

    if (tag) {
      searchResults = searchResults?.filter((student) => {
        if (student.tags) {
          const wholeString = student?.tags
            .map((tags) => tags.name)
            .join(" ")
            .toLowerCase();
          return wholeString.includes(tag?.toLowerCase());
        }
        return false;
      });
    }

    /**
     * the user tags are the tags where their id appears
     */
    return searchResults;
  }, [name, studentData, tagLookup, tag]);

  // Function that handles the search input and filters the search results
  const handleChange = (e) => {
    const { value } = e.target;
    setName(value);
  };

  const handleTag = (e) => {
    setTag(e.target.value);
  };

  /**
   *
   * @param {String} tag the tag string
   * @param {String} id the id of the student
   */

  /**
   * when you add a new tag, have a lookup that stores them in the format
   * tagName,tagId
   *
   * maintain another list with students and their tags
   * there is a list of students
   * so I can just add tag to the one edited
   *
   *
   *
   */

  const handleTagAdd = ({ id, tag }) => {
    /**
     * adds tag to a user
     */

    /**
     * if tag exist already in tagLookup
     */
    const tagExists = tagLookup[tag];
    /**
     * instead users to tags, you add tags to users
     */
    const studentDataCopy = studentData;
    const studentIndex = studentData.findIndex((student) => student.id === id);

    const student = studentDataCopy[studentIndex];

    const studentTags = student?.tags || [];

    /**
     * if tag exist in tagLookup, add the tag to the  user taglist
     */
    if (tagExists) {
      const tagInLookup = tagExists;

      if (student?.tags) {
        const tagExistForStudent =
          student?.tags.findIndex(
            (currentTag) => currentTag.name === tagInLookup.name
          ) !== -1;

        if (tagExistForStudent) {
          alert(`Student Already Has ${tagInLookup?.name}`);
          return;
        }
      }

      studentDataCopy[studentIndex] = {
        ...student,
        tags: [...studentTags, tagInLookup],
      };
      setData((prev) => [...studentData, student]);
      return;
    }
    /**
     * create tags
     */
    const tagObject = {
      name: tag,
      label: tag,
      id: Math.random().toString(36),
    };
    setTagLookup({ ...tagLookup, [tag]: tagObject });

    /**
     * add tags
     */
    studentDataCopy[studentIndex] = {
      ...student,
      tags: [...studentTags, tagObject],
    };
    setData(studentDataCopy);
  };

  return (
    <div className="App">
      {error && <span>Sorry, an error occured. Try again</span>}
      {!error && (
        <>
          <div className="data-div">
            <input
              value={name}
              onChange={handleChange}
              className="search"
              placeholder="Search by name"
            />
            <input
              value={tag}
              onChange={handleTag}
              className="search"
              placeholder="Search by tag"
            />
            <div className="list-div">
              {filterStudentsList?.length > 0 ? (
                filterStudentsList?.map((user) => {
                  return (
                    <StudentComponent obj={user} handleTagAdd={handleTagAdd} />
                  );
                })
              ) : (
                <></>
              )}

              {loading && <div class="loader"></div>}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
