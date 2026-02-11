// import Aside from "../components/Aside";
// import Nav from "../components/Nav";
// import ToastModal from "../components/UX/ToastModal";
// import useContextHook from "../hooks/useContextHook";
// import { useForm } from "react-hook-form";

// export function AdminPanel() {
//   const { myProfile } = useContextHook();
//   const {
//     register,
//     reset,
//     formState: { errors },
//     handleSubmit,
//   } = useForm();

//   if (myProfile?.role !== "ADMIN") return;

//   return (
//     <>
//       <main className="flex w-full h-full">
//         <Aside />
//         <div className="w-full">
//           <Nav />
//           <section>
//             <header>
//               <h3>Create books</h3>
//             </header>
//             <div>
//               <input />
//               <input />
//               <input />
//             </div>
//           </section>
//         </div>

//         <ToastModal />
//       </main>
//     </>
//   );
// }

// export default AdminPanel;
