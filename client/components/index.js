/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as Grid} from './grid'
export {default as Sequencer} from './sequencer'
export {default as PlayBtn} from './playBtn'
export {default as Instruments} from './instruments'
export {default as Drums} from './drums'
