import { UTApi } from "uploadthing/server";

export const utapi = new UTApi({
  // ...options,
});

// ? Cara pake:

// 1. Validasi file pake schema zod
// const MAX_FILE_SIZE = 5000000;
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
// const someSchema = z.object({
//   image: z
//     .any()
//     .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
//     .refine(
//       (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
//       "Only .jpg, .jpeg, .png and .webp formats are supported."
//     )
// })

// 2. Upload file
// const response = await utapi.uploadFiles(profile_photo); // ! profile_photo harus berupa File
// const profile_photo_path = response.data?.url; // * response.data?.url adalah URL dari file yang diupload
