import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,
  GoogleAuthProvider,signInWithPopup,signOut, setDoc, addDoc, collection, db, 
  getDocs, query, updateDoc,where, doc, onSnapshot, deleteDoc} from "./config.js";
    


    document.getElementById("profileForm")?.addEventListener("submit", async (e) => {
      e.preventDefault();
    
      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      const category = document.getElementById("category").value;
    
      try {
        await addDoc(collection(db, "Travel"), {
          title,
          description,
          category,
          createdAt: new Date(),
        });
    
        alert("Blog Added Successfully!");
        window.location.href = `./blog.html?category=Travel`;
      } catch (error) {
        console.error("Error adding blog:", error);
        alert("Failed to add blog.");
      }
    });
    
    // Fetch blogs based on category
    async function fetchBlogs(category) {
      const travelContainer = document.getElementById("travelContainer");
      travelContainer.innerHTML += "";
    
      console.log("Fetching blogs for category:", category);
    
      try {
        const q = query(collection(db, "Travel"), where("category", "==", category));
        const snapshot = await getDocs(q);
    
        console.log("Total blogs found:", snapshot.docs.length);
    
        if (snapshot.empty) {
          travelContainer.innerHTML += "<p>No blogs found in this category.</p>";
          return;
        }
    
        snapshot.forEach((doc) => {
          const data = doc.data();
          travelContainer.innerHTML += `
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
                </div>
              </div>
            </div>
          `;
        });
      } catch (error) {
        console.error("Error fetching blogs:", error);
        blogsContainer.innerHTML += "<p>Failed to load blogs. Please try again.</p>";
      }
    }
    
    // Extract category from URL and fetch blogs
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category") || "Travel";
    fetchBlogs("Travel");
    
    // Remove blog function
    window.removeFromBlogs = async function (docID) {
      try {
        await deleteDoc(doc(db, "Travel", docID));
        document.getElementById(`Travel-${docID}`).remove(); // Remove from DOM
        console.log("Item removed from blogs");
      } catch (error) {
        console.error("Error removing item:", error);
      }
    };
    
    // Wishlist function (if needed)
    window.toggleWishlist = function (id, title, description, category) {
      console.log(`Wishlist toggled for blog ID: ${id}`);
    };
    
    <button onclick="removeFromBlogs('${doc.id}')">Remove</button>