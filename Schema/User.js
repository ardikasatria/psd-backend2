import mongoose, { Schema } from "mongoose";
import fs from "fs";
import path from "path";

const profile_imgs_folder = path.join(__dirname, 'public', 'avatars');
let profile_imgs = fs.readdirSync(profile_imgs_folder).map(file => `/avatars/${file}`);

const userSchema = new mongoose.Schema({
    personal_info: {
        fullname: {
            type: String,
            lowercase: true,
            required: true,
            minlength: [3, 'fullname must be 3 letters long'],
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        password: String,
        username: {
            type: String,
            minlength: [3, 'Username must be 3 letters long'],
            unique: true,
        },
        bio: {
            type: String,
            maxlength: [200, 'Bio should not be more than 200'],
            default: "",
        },
        profile_img: {
            type: String,
            default: () => {
                return profile_imgs[Math.floor(Math.random() * profile_imgs.length)];
            }
        },
    },
    admin: {
        type: Boolean,
        default: false
    },
    social_links: {
        youtube: {
            type: String,
            default: "",
        },
        instagram: {
            type: String,
            default: "",
        },
        facebook: {
            type: String,
            default: "",
        },
        twitter: {
            type: String,
            default: "",
        },
        github: {
            type: String,
            default: "",
        },
        website: {
            type: String,
            default: "",
        }
    },
    account_info: {
        total_posts: {
            type: Number,
            default: 0
        },
        total_reads: {
            type: Number,
            default: 0
        },
    },
    google_auth: {
        type: Boolean,
        default: false
    },
    blogs: {
        type: [Schema.Types.ObjectId],
        ref: 'blogs',
        default: [],
    },
    notepad: {
        type: Schema.Types.ObjectId,
        ref: 'notepad',
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    todos: [{
        type: Schema.Types.ObjectId,
        ref: 'Todo',
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }],
    bookmarks: [{
        type: Schema.Types.ObjectId,
        ref: 'blogs'
    }]
}, {
    timestamps: {
        createdAt: 'joinedAt'
    }
});

export default mongoose.model("users", userSchema);
