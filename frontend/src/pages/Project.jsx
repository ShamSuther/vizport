import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toaster } from "@/components/ui/toaster";

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5050/api/projects/${id}`,
          {
            method: "GET",
          }
        );

        let result;
        if (response.ok && response.status == 200) {
          result = await response.json();
          setProject(result);
        } else {
          result = await response.json();
          console.log(result);
        }
      } catch (error) {
        setError(error);
        toaster.create({
          title: "Error",
          description: error.message,
          type: "error",
        });
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    console.log(project);
  }, [project]);

  return <div>Project {id}</div>;
};

export default Project;
