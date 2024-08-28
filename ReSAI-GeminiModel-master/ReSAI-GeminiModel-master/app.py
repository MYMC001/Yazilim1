import streamlit as st
import pandas as pd
import google.generativeai as generativeai
import os 

import PyPDF2  as pdf
from dotenv import load_dotenv


## Load environment variables
load_dotenv()

## Get the API key and configure the generativeai package

generativeai.configure(api_key=os.getenv("GOOGLE_GEMINI_PRO_API_KEY"))


## Gemni Pro Response

def get_gemini_pro_response(input):
    model = generativeai.GenerativeModel('gemini-pro')
    response = model.generate_content(input)

    return response.text



def input_pdf_text(uploaded_file):
    reader = pdf.PdfReader(uploaded_file)
    
    resumeText = ""

    for page in reader.pages:
        #page = reader.pages[page]
        resumeText += str(page.extract_text())


    return resumeText




## Input Prompt

input_prompt = """
You are an extremely skilled HR in a company, and you are looking for the best candidate for a job.
You have a very experienced ATS, with deep understanding of the job requirements and the candidates.
Your task is to evaluate the resume based on the job description and then give the following feedback:
1. Is the candidate a good fit for the job?
2. What is the candidate's experience?
3. What are the candidate's skills?
4. What is the candidate's education?
5. What is the candidate's contact information?
6. What is the candidate's location?
7. What is the candidate's email?
8. What is the candidate's phone number?
9. What is the candidate's Name and Surname?    
10. What is the candidate's job title?
11. What are the missing skills?    
12. What are the missing experiences?
13. Give a similarity score between the candidate and the job description.
14. Give a score for the candidate's skills.
15. Give a score for the candidate's experience.
16. Give a score for the candidate's education.
17. Give a score for the candidate's location.
18. Give a score for the candidate's email.

Below is the job description and the resume of the candidate.
Job Description: {job_description}
Resume: {resume}

Feedback:
{{
    Profile Summary: ""\n
    Experience: ""\n
    Skills: ""\n
    Education: ""\n
    Contact Information: ""\n
    Location: ""\n
    Email: ""\n
    Phone Number: ""\n
    Name and Surname: ""\n
    Job Title: ""\n
    Missing Skills: ""\n
    Missing Experiences: ""\n
    Similarity Score: ""\n
    Skills Score: ""\n
    Experience Score: ""\n
    Education Score: ""\n
    Location Score: ""\n
    Your final evaluation and decision: ""\n
}}
"""


## Streamlit App

st.title("ReSAI - Smart Recuitment System")

st.subheader("Upload the job description and the resume of the candidate to hire the best candidate for the job.")


job_description = st.text_area("Enter your full Job Description: ")

uploaded_file = st.file_uploader("Upload the resume of the candidate:")

submit_button = st.button("Evaluate")


if submit_button:
    if job_description == "":
        st.write("Please enter the job description.")
    if uploaded_file is not None:
        resume = input_pdf_text(uploaded_file)
        input_prompt = input_prompt.format(job_description=job_description, resume=resume)
        response = get_gemini_pro_response(input_prompt)
        st.subheader("Evaluation of the candidate:")
        st.write(response)
    else:
        st.write("Please upload the resume of the candidate.")