// ! Category
export interface Category {
  id: number;
  name: string;
  color: string;
  icon_url: string;
  image_filter: string;
  created_at: string;
}

//     "id": 1,
//     "name": "Work",
//     "color": "#ef4444",
//     "icon_url": "https://api.iconify.design/material-symbols/work.svg?color=white",
//     "image_filter": "grayscale",
//     "image_seed_offset": 100,
//     "created_at": "2025-08-25T10:00:00Z"
//   }

export interface Task {
  id: number;
  title: string;
  description?: string; 
  priority: 'low' | 'medium' | 'high';
  category_id: number;
  due_date?: string; 
  completed: boolean;
  image_url?: string;
  created_at: string;
}

//  {
//     "id": 1,
//     "title": "Complete project proposal",
//     "description": "Write and review the Q4 project proposal",
//     "priority": "high",
//     "category_id": 1,
//     "due_date": "2025-08-30",
//     "completed": false,
//     "image_url": "https://picsum.photos/400/300?random=101&grayscale",
//     "created_at": "2025-08-25T09:00:00Z",
//     "updated_at": "2025-08-25T09:00:00Z"
//   }



export interface IAddTask {
  title: string;
  category_id: number;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  due_date: string;
  image_url?: string;
}