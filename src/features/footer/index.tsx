import classes from './index.module.css';
import githubIcon from '../../shared/assets/github.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.leftPart}>
      <div className={classes.copyright} >Copyright © A. EGOROVA {new Date().getFullYear()}</div>
      <Link to={'https://github.com/Katyi/github-repos-app-'} target="_blank">
        <img src={githubIcon} alt="githubIcon" className={classes.githubIcon} />
      </Link>
      </div>
      <div className={classes.emailDiv}>egorova.aleksandra@gmail.com</div>
    </div>
  )
}

export default Footer;