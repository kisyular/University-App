import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import DashboardActions from '../../components/dashboard-actions/dashboard-actions.component';
import Experience from '../../components/experience/experience.component';
import Education from '../../components/education/education.component';
//import EditExperience from '../../pages/edit-experience/edit-experience.component';

import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../redux/profile/profile-actions';

import './dashboard.styles.scss';
import Spinner from '../../components/Spinner/Spinner.component';

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading }}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  if(loading) return <Spinner />
  else
  return (
    <div className='dashboard'>
      <DashboardActions />
      <h1>Dashboard</h1>
      
      {profile !== null ? (
        <div>
          <div className='info row justify-content-around'>
            
            <div className='col-lg-5 text-align'>
              <h4 className="mb-4">Experiências</h4>
                {
                  profile.experience && profile.experience.length > 0
                    ? 
                      profile.experience.map( exp => (
                        <Experience key={exp._id} experience={exp} displayButtons='true' />
                      )) 
                    : 
                      <p>Você ainda não adicionou nenhuma experiência. Click
                        <Link to='/adicionar-experiencia'> Aqui</Link> para adicionar.
                      </p>
                }
            </div>

            <div className='col-lg-5'>
              <h4 className='mb-4'>Educação</h4>
              {
                profile.education && profile.education.length > 0
                  ?
                    profile.education.map( edu => (
                      <Education key={edu._id} education={edu} displayButtons='true' />
                    ))
                  :
                  <p>Você ainda não adicionou nenhuma educação. Click 
                    <Link to='/adicionar-educacao'> Aqui</Link> para adicionar.
                  </p>
              }
            </div>

          </div>

        </div>
      ) : (
        <div>
          <p>Você ainda não tem um perfil, crie um agora.</p>
          <Link to="/criar-perfil" className="btn btn-primary my-1">
            Criar Perfil
          </Link>
        </div>
      )}
    </div>
  );
};


const mapStateToProps = (state) => ({
  auth: state.user,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
