export const API_URL = "/predictdata";

export const getPredictEndpoint = () => API_URL;

export const FORM_FIELDS = {
  gender: "gender",
  ethnicity: "ethnicity",
  parentalEducation: "parental_level_of_education",
  lunch: "lunch",
  testPreparation: "test_preparation_course",
  readingScore: "reading_score",
  writingScore: "writing_score",
};

export const FORM_OPTIONS = {
  gender: [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ],
  ethnicity: [
    { value: "group A", label: "Group A" },
    { value: "group B", label: "Group B" },
    { value: "group C", label: "Group C" },
    { value: "group D", label: "Group D" },
    { value: "group E", label: "Group E" },
  ],
  parentalEducation: [
    { value: "associate's degree", label: "Associate's Degree" },
    { value: "bachelor's degree", label: "Bachelor's Degree" },
    { value: "high school", label: "High School" },
    { value: "master's degree", label: "Master's Degree" },
    { value: "some college", label: "Some College" },
    { value: "some high school", label: "Some High School" },
  ],
  lunch: [
    { value: "free/reduced", label: "Free / Reduced" },
    { value: "standard", label: "Standard" },
  ],
  testPreparation: [
    { value: "none", label: "None" },
    { value: "completed", label: "Completed" },
  ],
};
