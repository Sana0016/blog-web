import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,
  GoogleAuthProvider,signInWithPopup,signOut, setDoc, addDoc, collection, db, 
  getDocs, query, updateDoc,where, doc, onSnapshot, deleteDoc} from "./config.js";

  document.getElementById('add-post')?.addEventListener('click', () => {
      window.location.href = './add-blog.html';
  });




document.getElementById("profileForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;

    await addDoc(collection(db, "blogs"), {
      title,
      description,
      category,
      createdAt: new Date()
    });

    alert("Blog Added Successfully!");
    window.location.href = `./food.html?category=Food`;

});




// // wishlist


async function fetchBlogs(category) {
  const blogsContainer = document.getElementById("blogsContainer");
  blogsContainer.innerHTML = ""; 

  console.log("Fetching blogs for category:", category);

  try {
    const q = query(collection(db, "blogs"), where("category", "==", category));
    const snapshot = await getDocs(q);

    console.log("Total blogs found:", snapshot.docs.length); 

    if (snapshot.empty) {
      blogsContainer.innerHTML = "<p>No blogs found in this category.</p>";
      return;
    }

    snapshot.forEach((doc, index) => {
      const data = doc.data();
      // console.log(`Rendering Blog ${index + 1}:`, data); 

      blogsContainer.innerHTML += `
        <div class="blog-card" id="blog-${doc.id}">
          <div class="blog-content">
            <h2>${data.title}</h2>
            <p>${data.description}</p>
          </div>
          <div class="card-footer">
            <span class="category">#${data.category}</span>
            <div class="icons">
              <i class="fa fa-heart" onclick="toggleWishlist('${doc.id}', '${data.title}', '${data.description}', '${data.category}')"></i>
              <i class="fa fa-comment"></i>
               <div class="card-footer">
            <span class="category">#${data.category}</span>
            <button onclick="removeFromBlogs('${doc.id}')">Remove</button>
          </div>
            </div>
          </div>
        </div>
      `;
    });

  } catch (error) {
    console.error("Error fetching blogs:", error);
    blogsContainer.innerHTML = "<p>Failed to load blogs. Please try again.</p>";
  }
}
// Extract category from URL and fetch blogs
const params = new URLSearchParams(window.location.search);
const category = params.get("category") || "Food"; 
fetchBlogs(category);


window.removeFromBlogs = async function (docID) {
  try {
    await deleteDoc(doc(db, "blogs", docID)); // Firebase se delete karega
    console.log("Item removed from blogs");
  } catch (error) {
    console.error("Error removing item:", error);
  }
};

// Wishlist Functionality

async function fetchWishlistRealtime() {
  const wishlistContainer = document.getElementById("wishlistContainer");
  wishlistContainer.innerHTML = "";

  const userID = "currentUser"; // Replace with actual user ID
  const wishlistRef = collection(db, "wishlist");
  const q = query(wishlistRef, where("userID", "==", userID));

  onSnapshot(q, (snapshot) => {
    wishlistContainer.innerHTML = ""; // Clear existing items
    if (snapshot.empty) {
      wishlistContainer.innerHTML = "<p>No items in wishlist.</p>";
      return;
    }
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      wishlistContainer.innerHTML += `
        <div class="blog-card">
          <div class="blog-content">
            <h2>${data.title}</h2>
            <p>${data.description}</p>
          </div>
          <div class="card-footer">
            <span class="category">#${data.category}</span>
            <button onclick="removeFromWishlist('${doc.id}')">Remove</button>
          </div>
        </div>
      `;
    });
  });
}

// ✅ Ensure this function runs when wishlist.html loads
window.onload = fetchWishlistRealtime;



// Function to remove item from wishlist
window.removeFromWishlist = async function (docID) {
  try {
    await deleteDoc(doc(db, "wishlist", docID)); // Firebase se delete karega
    console.log("Item removed from wishlist");
  } catch (error) {
    console.error("Error removing item:", error);
  }
};
