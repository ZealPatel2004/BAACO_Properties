import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  getAnalytics,
  isSupported as analyticsIsSupported
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-analytics.js";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {///this function is used to connect the firebase to the website and make sure it works correctly
  apiKey: "AIzaSyCWHUhIg_OOLk_gz3Uy2nCIhqTxLY4Cnhs",///the api key is used to connect the firebase to the website and make sure it works correctly
  authDomain: "baacoproperties.firebaseapp.com",//the auth domn is used to connect the firebase to the website and make sure it works correctly
  projectId: "baacoproperties",///the project id is used to connect the firebase to the website and make sure it works correctly
  storageBucket: "baacoproperties.firebasestorage.app",
  messagingSenderId: "890736693635",///the messaging sender id is used to connect the firebase to the website and make sure it works correctly
  appId: "1:890736693635:web:b264b606af8229881566b6",
  measurementId: "G-9YPBDJ23K9"
};

const app = initializeApp(firebaseConfig);//this variable is used to initialize the firebase app and make sure it works correctly
const db = getFirestore(app);

analyticsIsSupported()
  .then((supported) => {
    if (supported) {
      getAnalytics(app);
    }
  })
  .catch(() => {
    // Ignore analytics setup failures to avoid blocking form submissions.
  });

const contactForm = document.getElementById("contactForm");//the contact form variable is used to get the contact form element from the DOM and make sure it works correctly
const formSuccess = document.getElementById("formSuccess");///the form success variable is used to get the form success element from the DOM and make sure it works correctly

if (contactForm && formSuccess) {// the following if statment checks if the contact form and form success elements
  const submitButton = contactForm.querySelector(".submit-btn");

  const showStatus = (message, type = "success") => {
    formSuccess.textContent = message;///this code snippet is used to show the status of the form submission, whether it was successful or if there was an error. It updates the text content of the formSuccess element with the provided message and applies appropriate styling based on the type of message (success or error).
    formSuccess.classList.remove("visible", "error");
    if (type === "error") {
      formSuccess.classList.add("error");
    }
    formSuccess.classList.add("visible");///this form success.classList.add("visible"); line adds the "visible" class to the formSuccess element, making it visible on the page. This is typically used to display a success or error message to the user after they submit the contact form.
  };

  contactForm.addEventListener("submit", async (event) => {///the contactForm.addEventListener("submit", async (event) => { line adds an event listener to the contact form that listens for the "submit" event. When the form is submitted, it triggers the provided asynchronous function, allowing for custom handling of the form submission, such as validating input, sending data to a server, and providing feedback to the user.
    event.preventDefault();

    if (!submitButton) {//this if statement checks if the submit button is present in the form
      return;// the return statement is used to exit the function if the submit button has not been foound
    }

    const formData = new FormData(contactForm);
    const inquiryType = String(formData.get("inquiryType") || "").trim();// this line retrieves the value of the "inquiryType" field from the form data, converts it to a string, and trims any leading or trailing whitespace. If the field is empty or not present, it defaults to an empty string. This ensures that the inquiry type is properly captured for further processing or validation.

    if (!inquiryType) {/// the if statement checks if the inquiryType variable is empty or not. If it is empty, it means that the user has not selected a type of inquiry before submitting the form. In this case, it calls the showStatus function to display an error message to the user, prompting them to enter a type of inquiry before submitting the form. After showing the error message, it returns from the function to prevent further processing of the form submission.
      showStatus("Please enter a type of inquiry before submitting.", "error");
      return;
    }

    const payload = {/// the const function
      firstName: String(formData.get("firstName") || "").trim(),///This is first name of the person
      lastName: String(formData.get("lastName") || "").trim(),///this is the last name of the person
      company: String(formData.get("company") || "").trim(),////this is the company name
      phone: String(formData.get("phone") || "").trim(),
      email: String(formData.get("email") || "").trim(),  ////This ensures all the emails have worked correctly
      inquiryType,
      message: String(formData.get("message") || "").trim(),   ///This ensures all the messages have been read correctly
      updates: contactForm.querySelector("#updates")?.checked || false,/// this are all the updates 
      submittedAt: serverTimestamp()///this is when it ws submitted
    };

    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    try {//this is a try/ catch clause to make sure the product is made correctly
      await addDoc(collection(db, "contactSubmissions"), payload);
      contactForm.reset();
      showStatus("Thank you! Your inquiry was sent successfully.");
    } catch (error) {
      console.error("Firebase contact form submission failed:", error);

      if (error?.code === "permission-denied") {///the if statement catches if there is any error
        showStatus("Submission blocked by Firestore rules. Please publish rules that allow create on contactSubmissions.", "error");
      } else if (error?.code === "unavailable") {
        showStatus("Network issue reached Firebase. Please check connection and try again.", "error");
      } else {//the eslse statement catches if there is any error
        showStatus("We could not send your message right now. Please try again in a moment.", "error");
      }
    } finally {
      submitButton.textContent = "Submit Inquiry";
      submitButton.disabled = false;

      window.setTimeout(() => {
        formSuccess.classList.remove("visible", "error");
      }, 6000);
    }
  });
}
