export interface FileResponse {
  id: number;
  name: string;
  original_name: string;
  mime_type: string;
  extension: string;
  file_type: string;
  size: number;
  status: "attached" | "detached";
  url: string;
  is_attached: boolean;
  attachable_type: "project" | "task";
  attachable_id: number;
  uploader: {
    id: number;
    name: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
}

export interface UploadFilePayload {
  name: string;
  file: File;
}
export interface UploadFileResponse {
  data: FileResponse;
}

export interface ProjectFilesResponse {
  data: FileResponse[];
}

//   {
//     "data": {
//         "id": 3,
//         "name": "Project PDF",
//         "original_name": "Screenshot 2026-07-01 171730.png",
//         "mime_type": "image/png",
//         "extension": "png",
//         "file_type": "image",
//         "size": 11513,
//         "status": "attached",
//         "url": "http://localhost/storage/files/2026/07/Ja5B47QF1EZ2tdezHKaPMDjQYObx7HumffdvDekU.png",
//         "is_attached": true,
//         "attachable_type": "project",
//         "attachable_id": 11,
//         "attachable": {
//             "id": 11,
//             "type": "project",
//             "label": "CollabSpace Project"
//         },
//         "uploader": {
//             "id": 5,
//             "name": "hananAdeeb",
//             "email": "hanan.bayazeed56@gmail.com"
//         },
//         "created_at": "2026-07-01 14:18:55",
//         "updated_at": "2026-07-01 14:18:55"
//     }
// }
// }
//  "data": [
//         {
//             "id": 3,
//             "name": "Project PDF",
//             "original_name": "Screenshot 2026-07-01 171730.png",
//             "mime_type": "image/png",
//             "extension": "png",
//             "file_type": "image",
//             "size": 11513,
//             "status": "attached",
//             "url": "http://localhost/storage/files/2026/07/Ja5B47QF1EZ2tdezHKaPMDjQYObx7HumffdvDekU.png",
//             "is_attached": true,
//             "attachable_type": "project",
//             "attachable_id": 11,
//             "uploader": {
//                 "id": 5,
//                 "name": "hananAdeeb",
//                 "email": "hanan.bayazeed56@gmail.com"
//             },
//             "created_at": "2026-07-01 14:18:55",
//             "updated_at": "2026-07-01 14:18:55"
//         }
//     ]
