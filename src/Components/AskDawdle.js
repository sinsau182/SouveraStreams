import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 1000;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
  height: auto;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 15px;
    gap: 15px;
    transform: translateY(-60px); /* Shifts the container 20px upwards */
  }
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 18px;
  color: ${({ theme }) => theme.text};

  &:hover {
    color: ${({ theme }) => theme.soft};
  }
`;

const Title = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.text};
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 5px;
  padding: 10px;
  background-color: transparent;
  font-size: 16px;
  transition: border 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 5px;
  padding: 10px;
  background-color: transparent;
  font-size: 16px;
  transition: border 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;

const Button = styled.button`
  border-radius: 5px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.bgLighter};
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 16px;
  }
`;

const Error = styled.div`
  color: red;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const AskDawdle = ({ setOpen, video }) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    company: Yup.string().required("Company name is required"),
    designation: Yup.string().required("Designation is required"),
    message: Yup.string().required("Message is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      designation: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const user = currentUser ? currentUser.name : "Anonymous";
        await axios.post(`${baseUrl}/messages`, {
          ...values,
          user: user,
          video: video.title,
        });
        alert("Feedback submitted successfully!");
        resetForm();
        setOpen(false);
      } catch (error) {
        console.error("Error submitting feedback:", error);
      }
    },
  });

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Connect with Us</Title>
        <Form onSubmit={formik.handleSubmit}>
          <Input
            type="text"
            placeholder="Your Name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <Error>{formik.errors.name}</Error>
          ) : null}

          <Input
            type="text"
            placeholder="Your Email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <Error>{formik.errors.email}</Error>
          ) : null}

          <Input
            type="text"
            placeholder="Your Phone Number"
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <Error>{formik.errors.phone}</Error>
          ) : null}

          <Input
            type="text"
            placeholder="Your Company"
            name="company"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.company}
          />
          {formik.touched.company && formik.errors.company ? (
            <Error>{formik.errors.company}</Error>
          ) : null}

          <Input
            type="text"
            placeholder="Your Designation"
            name="designation"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.designation}
          />
          {formik.touched.designation && formik.errors.designation ? (
            <Error>{formik.errors.designation}</Error>
          ) : null}

          <Desc
            placeholder="Please enter your Query here..."
            name="message"
            rows={8}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
          />
          {formik.touched.message && formik.errors.message ? (
            <Error>{formik.errors.message}</Error>
          ) : null}

          <Button type="submit">Submit</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default AskDawdle;
