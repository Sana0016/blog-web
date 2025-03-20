import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,
     GoogleAuthProvider,signInWithPopup,signOut, setDoc, addDoc, collection, db, 
     getDocs, query, updateDoc,where, doc, deleteDoc} from "./config.js";



// signupWithEmailAndPassword
const signupBtn = document.getElementById("signup");

const handleSignup = async (event) => {
    event.preventDefault();

    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value.trim();

    if (!email || !password) {
        alert("Please enter both email and password!");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User registered:", user);
        window.location.href = "./index.html";

    } catch (error) {
        console.error("Error:", error.message);
        alert(error.message);
    }
};

signupBtn?.addEventListener("click", handleSignup);

// onauthstatechange
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is logged in:", user);
        if (window.location.pathname.includes("login.html")) {
            window.location.href = "./index.html"; 
        }
    } else {
        console.log("User is not logged in.");
        if (!window.location.pathname.includes("login.html")) {
            window.location.href = "./login.html"; 
        }
    }
});

// userLogin

const userlogin = async (e) => {
    e.preventDefault(); 

    const loginEmail = document.getElementById("login-email").value;
    const loginPassword = document.getElementById("login-password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        const user = userCredential.user;
        if (user) {
            window.location.href = "./index.html";
        }
    } catch (error) {
        console.log(error.message); 
    }
};

document.getElementById("login-btn")?.addEventListener("click", userlogin);

// loginWithGoogle
const provider = new GoogleAuthProvider();

const loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        console.log("User signed in:", result.user);
        window.location.href = "./index.html"; 
    } catch (error) {
        console.error("Error during Google login:", error.message);
    }
};

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("google-login")?.addEventListener("click", loginWithGoogle);
});

// logout

const userLogout = async () => {
    try {
        await signOut(auth);
        console.log("User logged out successfully");
        window.location.href = "./login.html"; 
    } catch (error) {
        console.error("Error during logout:", error.message);
    }
};

document.getElementById("logout-btn")?.addEventListener("click", userLogout);


// profile-update


document.getElementById("save-profile")?.addEventListener("click", async () => {
    const newName = document.getElementById("name").value;
    const newBio = document.getElementById("bio").value;
    const newSkills = document.getElementById("skills").value;

    if (!newName || !newBio || !newSkills) {
        alert("Please fill in all fields before saving.");
        return;
    }

    // Update UI instantly
    document.getElementById("display-name").innerText = newName;
    document.getElementById("display-bio").innerText = newBio;
    document.getElementById("display-skills").innerText = "Skills: " + newSkills;

    try {
        const user = auth.currentUser;
        if (!user) {
            alert("User not logged in.");
            return;
        }

        const userQuery = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(userQuery);

        if (querySnapshot.empty) {
            // No document exists, create a new one
            const docRef = await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: newName,
                bio: newBio,
                skills: newSkills
            });
            alert("Profile created successfully!");
        } else {
            // Document exists, update it
            const userDoc = querySnapshot.docs[0];
            const docRef = doc(db, "users", userDoc.id);
            await updateDoc(docRef, {
                name: newName,
                bio: newBio,
                skills: newSkills
            });
            alert("Profile updated successfully!");
        }
    } catch (error) {
        console.error("Error updating profile:", error.message);
        alert("Error: " + error.message);
    }
});
