export const MOCK = false;

// export const BASE_URL = MOCK ? '' : 'http://localhost:4000';
export const BASE_URL = MOCK ? 'http://192.168.1.109:7000' : 'http://192.168.1.134:4000';

export const LINK_HOME = '/home';
export const AUTH_LINK = '/auth';
export const LINK_LOGIN = AUTH_LINK + '/login';
export const LINK_SIGNUP = AUTH_LINK + '/signup';


export const USER_TYPE_LEARNER = 'learner';
export const USER_TYPE_INSTRUCTOR = 'instructor';
export const USER_TYPE_ADMIN = 'admin';

export const STATUS_IDLE = 'idle';
export const STATUS_LOADING = 'loading';
export const STATUS_SUCCEEDED = 'succeeded';
export const STATUS_FAILED = 'failed';

export const LINK_LEARNER = '/learner';
export const LINK_INSTRUCTOR = '/instructor';
export const LINK_ADMIN = '/admin';
export const LINK_COURSE = 'course/:id';
export const LINK_COURSES = 'mycourses';
export const LINK_EDIT_PROFILE = 'editprofile';

export const CREATE = 'Create';
export const ENROLL = 'Enroll';

export const AUTHENTICATION_STATE_KEY = 'user_state_key';
export const AUTHENTICATION_TYPE_LOGIN = 'login';
export const AUTHENTICATION_TYPE_SIGNUP = 'signup';

export const METHOD_POST = 'POST';
export const METHOD_GET = 'GET';
export const METHOD_PATCH = 'PATCH';