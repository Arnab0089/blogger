// 'use client';
// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import uploadIcon from '@/Assets/upload_area.png';
// import profileIcon from '@/Assets/profile_icon.png';
// import { jwtDecode } from 'jwt-decode';
// import axios from 'axios';

// interface DecodedToken {
//   id: string;
//   email: string;
//   name: string;
//   iat: number;
//   exp: number;
// }

// export default function Page() {
//   const [image, setImage] = useState<File | null>(null);
//   const [categories, setCategories] = useState([
//     'Tech',
//     'Lifestyle',
//     'Business',
//   ]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [customCategory, setCustomCategory] = useState('');
//   const [showCustomInput, setShowCustomInput] = useState(false);
//   const [tags, setTags] = useState('');

//   const [data, setData] = useState({
//     title: '',
//     description: '',
//     category: '',
//     author: '',
//     authorImg: '',
//   });

//   // ✅ Decode token to get author name
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     console.log('Token from localStorage:', token);
//     if (token) {
//       try {
//         const decoded = jwtDecode<DecodedToken>(token);
//         if (decoded?.name) {
//           setData((prev) => ({ ...prev, author: decoded.name }));
//         } else {
//           console.warn('Decoded token has no name');
//         }
//       } catch (error) {
//         console.error('Invalid token', error);
//       }
//     } else {
//       console.warn('Token not found in localStorage');
//     }
//   }, []);

//   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const value = e.target.value;
//     if (value === 'custom') {
//       setShowCustomInput(true);
//     } else {
//       setSelectedCategory(value);
//       setData((prev) => ({ ...prev, category: value })); // ✅ Keep in sync
//       setShowCustomInput(false);
//     }
//   };

//   const handleAddCustomCategory = () => {
//     if (customCategory.trim()) {
//       setCategories((prev) => [...prev, customCategory]);
//       setSelectedCategory(customCategory);
//       setData((prev) => ({ ...prev, category: customCategory }));
//       setCustomCategory('');
//       setShowCustomInput(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!image) {
//       alert('Please upload a thumbnail image.');
//       return;
//     }

//     if (!data.author) {
//       alert('Author information is missing!');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', data.title);
//     formData.append('description', data.description);
//     formData.append('category', data.category || selectedCategory); // ✅ Fallback
//     formData.append('author', data.author); // ✅ This will be empty if token is missing
//     formData.append('tags', tags);
//     formData.append('image', image);
//     formData.append('authorImage', data.authorImg.toString());

//     try {
//       const res = await axios.post('/api/blog', formData);
//       if (res.status === 200) {
//         alert('Blog uploaded successfully!');
//         setData({
//           title: '',
//           description: '',
//           category: '',
//           author: data.author,
//           authorImg: '',
//         });
//         setTags('');
//         setSelectedCategory('');
//         setImage(null);
//       } else {
//         alert(`Error: ${res.data}`);
//       }
//     } catch (error) {
//       console.error('Submission error:', error);
//       alert('Something went wrong.');
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit} className="pt-5 px-5 sm:pt-12 sm:pl-16">
//         <p className="text-xl">Upload Thumbnail</p>
//         <div className="flex gap-5 items-center">
//           <label htmlFor="image">
//             <Image
//               src={!image ? uploadIcon : URL.createObjectURL(image)}
//               alt="Upload Icon"
//               width={140}
//               height={140}
//               className="mt-4 cursor-pointer"
//             />
//           </label>
//           <input
//             type="file"
//             className="hidden"
//             accept="image/*"
//             required
//             id="image"
//             onChange={(e) => {
//               if (e.target.files && e.target.files[0]) {
//                 setImage(e.target.files[0]);
//               }
//             }}
//           />
//           {image && (
//             <button type="button" onClick={() => setImage(null)}>
//               <Image
//                 src={'/assest2/close.png'}
//                 alt="Close Icon"
//                 width={20}
//                 height={20}
//                 className="cursor-pointer mt-4"
//               />
//             </button>
//           )}
//           <div>
//             <p className="text-sm">Supported formats: JPG, PNG</p>
//             <p className="text-sm">Max size: 4MB</p>
//           </div>
//         </div>

//         <p className="text-xl mt-4">Blog Title</p>
//         <input
//           type="text"
//           value={data.title}
//           onChange={(e) =>
//             setData((prev) => ({ ...prev, title: e.target.value }))
//           }
//           className="w-full sm:w-[500px] border border-black rounded-lg px-3 py-2 mt-2"
//           placeholder="Enter blog title"
//           required
//         />

//         <p className="text-xl mt-4">Blog Content</p>
//         <textarea
//           value={data.description}
//           onChange={(e) =>
//             setData((prev) => ({ ...prev, description: e.target.value }))
//           }
//           className="w-full sm:w-[500px] border border-black rounded-lg px-3 py-2 mt-2"
//           placeholder="Write your blog content here"
//           rows={10}
//           required
//         ></textarea>

//         <p className="text-xl mt-4">Blog Tags</p>
//         <input
//           type="text"
//           value={tags}
//           onChange={(e) => setTags(e.target.value)}
//           className="w-full sm:w-[500px] border border-black rounded-lg px-3 py-2 mt-2"
//           placeholder="Enter blog tags (comma separated)"
//           required
//         />

//         <p className="text-xl mt-4">Category</p>
//         <select
//           value={selectedCategory}
//           onChange={handleCategoryChange}
//           className="w-full sm:w-[500px] border border-black rounded-lg px-3 py-2 mt-2"
//           required
//         >
//           <option value="">Select a category</option>
//           {categories.map((cat) => (
//             <option key={cat} value={cat}>
//               {cat}
//             </option>
//           ))}
//           <option value="custom">Add new category...</option>
//         </select>

//         {showCustomInput && (
//           <div className="mt-3 gap-5">
//             <input
//               type="text"
//               className="w-full sm:w-[500px] border border-blue-500 rounded-lg px-3 py-2"
//               placeholder="Enter new category name"
//               value={customCategory}
//               onChange={(e) => setCustomCategory(e.target.value)}
//             />
//             <button
//               type="button"
//               onClick={handleAddCustomCategory}
//               className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
//             >
//               Add Category
//             </button>
//           </div>
//         )}

//         <br />

//         <button
//           type="submit"
//           className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Add Blog Post
//         </button>
//       </form>
//     </div>
//   );
// }

'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import profileIcon from '@/Assets/profile_icon.png';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import 'quill/dist/quill.snow.css';
import Quill from 'quill';
import toolBarOptions from '@/component/AdminComponent/Toolbar/toolbar';

interface DecodedToken {
  id: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
}

export default function Page() {
  const [image, setImage] = useState<File | null>(null);
  const [authorImageFile, setAuthorImageFile] = useState<File | null>(null);

  const quillRef = React.useRef<Quill | null>(null);
  const editorRef = React.useRef<HTMLDivElement | null>(null);

  const [categories, setCategories] = useState([
    'Tech',
    'Lifestyle',
    'Business',
  ]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [tags, setTags] = useState('');

  const [data, setData] = useState({
    title: '',
    description: '',
    blogContent: '',
    category: '',
    author: '',
    authorImg: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        if (decoded?.name) {
          setData((prev) => ({ ...prev, author: decoded.name }));
        }
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'custom') {
      setShowCustomInput(true);
    } else {
      setSelectedCategory(value);
      setData((prev) => ({ ...prev, category: value }));
      setShowCustomInput(false);
    }
  };

  const handleAddCustomCategory = () => {
    if (customCategory.trim()) {
      setCategories((prev) => [...prev, customCategory]);
      setSelectedCategory(customCategory);
      setData((prev) => ({ ...prev, category: customCategory }));
      setCustomCategory('');
      setShowCustomInput(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      alert('Please upload a thumbnail image.');
      return;
    }

    if (!data.author) {
      alert('Author information is missing!');
      return;
    }

    const quillContent = quillRef.current?.root.innerHTML || '';
    console.log('Submitting blog content:', quillContent);

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category || selectedCategory);
    formData.append('author', data.author);
    formData.append('tags', tags);
    formData.append('image', image);
    formData.append('blogContent', quillContent);
    if (authorImageFile) formData.append('authorImage', authorImageFile);

    try {
      const res = await axios.post('/api/blog', formData);
      if (res.status === 200) {
        console.log('Blog uploaded successfully:', res.data);
        alert('Blog uploaded successfully!');

        setData({
          title: '',
          description: '',
          blogContent: '',
          category: '',
          author: data.author,
          authorImg: '',
        });
        setTags('');
        setSelectedCategory('');
        setImage(null);
        setAuthorImageFile(null);

        quillRef.current?.setText('');
      } else {
        alert(`Error: ${res.data}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong.');
    }
  };

  useEffect(() => {
    let cancelled = false;
    if (!editorRef.current) return;
    if (quillRef.current) return; // already initialized

    import('quill').then((QuillModule) => {
      if (cancelled) return;

      const Quill = QuillModule.default;

      // Prevent multiple appends
      if (editorRef.current!.childElementCount === 0) {
        const el = document.createElement('div');
        editorRef.current!.appendChild(el);

        const q = new Quill(el, {
          theme: 'snow',
          placeholder: 'Write your blog content here...',
          modules: {
            toolbar: toolBarOptions,
          },
        });

        quillRef.current = q;
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="image py-5 sm:py-12 ">
      <form onSubmit={handleSubmit} className="pt-5 px-5 lg:pl-16 lg:pt-12 ">
        <div>
          <p className="text-xl text-black font-semibold bg-bg-primary  rounded-2xl p-2 shadow-[-7px_7px_0px] inline-block ">
            Upload Thumbnail
          </p>
          <div className="flex gap-5 items-center justify-center text-rose-500 h-[500px]">
            <label
              htmlFor="image"
              className="cursor-pointer bg-bg-secondary rounded-lg p-4 hover:bg-gray-200 transition-all duration-300"
            >
              <Image
                src={
                  !image ? '/assest2/upload.png' : URL.createObjectURL(image)
                }
                alt="Upload Icon"
                width={!image ? 140 : 600}
                height={!image ? 140 : 350}
                className={`mt-4 cursor-pointer rounded-lg object-cover transition-all duration-300 ${
                  !image ? '' : 'shadow-lg border border-gray-300'
                }`}
              />
              {!image && (
                <p className="text-sm text-center text-font-primary">
                  Upload Image
                </p>
              )}
            </label>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              required
              id="image"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
            />
            {image && (
              <button type="button" onClick={() => setImage(null)}>
                <Image
                  src={'/assest2/close.png'}
                  alt="Close Icon"
                  width={20}
                  height={20}
                  className="cursor-pointer mt-4"
                />
              </button>
            )}
            <div className="text-fuchsia-900 font-bold">
              <p className="text-sm">Supported formats: JPG, PNG</p>
              <p className="text-sm">Max size: 4MB</p>
            </div>
          </div>
        </div>
        {/* Title */}
        <div>
          <p className="text-xl my-5  text-black font-semibold bg-bg-primary  rounded-2xl p-2 shadow-[-7px_7px_0px] inline-block  ">
            Blog Title
          </p>
          <div className="flex items-center justify-center">
            <input
              type="text"
              value={data.title}
              onChange={(e) =>
                setData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full sm:w-[500px] border border-black rounded-lg px-3 py-2 mt-2 bg-bg-light-primary text-black "
              placeholder="Enter blog title"
              required
            />
          </div>
        </div>

        <div className="w-[90%] my-5">
          {/* Description */}
          <p className="text-xl my-5  text-black font-semibold bg-bg-primary  rounded-2xl p-2 shadow-[-7px_7px_0px] inline-block  ">
            Blog Content
          </p>
          <div className="flex items-center justify-center">
            <textarea
              value={data.description}
              onChange={(e) =>
                setData((prev) => ({ ...prev, description: e.target.value }))
              }
              className="w-full sm:w-[90%] border border-black rounded-lg px-3 py-2 mt-2 bg-bg-light-primary text-black"
              placeholder="Write your blog content here"
              rows={5}
              required
            />
          </div>
        </div>

        {/* Quill Editor for Blog Content */}
        <div className="mt-4 w-[90%] my-5">
          <p className="text-xl my-5  text-black font-semibold bg-bg-primary  rounded-2xl p-2 shadow-[-7px_7px_0px] inline-block  ">
            {' '}
            Blog Content
          </p>
          <div className="w-full h-[500px] pb-16 sm:pb-10 relative bg-bg-light-primary text-black">
            <div ref={editorRef} className="h-full"></div>
          </div>
        </div>

        {/* Tags */}
        <div>
          <p className="text-xl my-5  text-black font-semibold bg-bg-primary  rounded-2xl p-2 shadow-[-7px_7px_0px] inline-block  ">
            Blog Tags
          </p>
          <div className="flex items-center justify-center">
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full sm:w-[500px] border border-black rounded-lg px-3 py-2 mt-2 text-black bg-bg-light-primary"
              placeholder="Enter blog tags (comma separated)"
              required
            />
          </div>
        </div>

        <div>
          {/* Category */}
          <p className="text-xl my-5  text-black font-semibold bg-bg-primary  rounded-2xl p-2 shadow-[-7px_7px_0px] inline-block  ">
            Category
          </p>
          <div className="flex items-center justify-center">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full sm:w-[500px] border border-black rounded-lg px-3 py-2 mt-2 bg-bg-light-primary text-black"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
              <option value="custom">Add new category...</option>
            </select>

            {showCustomInput && (
              <div className="mt-3 gap-5">
                <input
                  type="text"
                  className="w-full sm:w-[500px] border border-blue-500 rounded-lg px-3 py-2"
                  placeholder="Enter new category name"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleAddCustomCategory}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Add Category
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-2  my-10">
          {/* Author Image (Optional) */}
          <p className="text-xl my-5  text-black font-semibold bg-bg-primary  rounded-2xl p-2 shadow-[-7px_7px_0px] inline-block">
            Author Image (Optional)
          </p>
          <div className="flex items-center gap-6 flex-wrap justify-center ">
            <label
              htmlFor="authorImage"
              className="cursor-pointer bg-bg-secondary rounded-xl p-4 hover:bg-gray-200 transition-all duration-300 flex flex-col items-center shadow-sm"
            >
              <Image
                src={
                  authorImageFile
                    ? URL.createObjectURL(authorImageFile)
                    : '/assest2/profile_icon.png'
                }
                alt="Author Icon"
                width={100}
                height={100}
                className="rounded-full object-cover mb-2"
              />
              <p className="text-sm text-font-primary">Change Author Image</p>
            </label>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="authorImage"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setAuthorImageFile(e.target.files[0]);
                }
              }}
            />

            {authorImageFile && (
              <button
                type="button"
                onClick={() => setAuthorImageFile(null)}
                className="text-sm px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-200"
              >
                Remove
              </button>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-center col-span-2 mt-3">
          <br />
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded  w-[50%] lg:w-[25%]"
          >
            Add Blog Post
          </button>
        </div>
      </form>
    </div>
  );
}
