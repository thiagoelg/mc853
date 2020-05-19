exports.seed = knex => {
  return knex('permissions').truncate().then(() => {
    return knex('permissions').insert([
      { name: 'Gerenciar perfis de acesso', short_name: 'manage_roles' },
      { name: 'Atribuir perfis de acesso', short_name: 'assign_roles' },
      { name: 'Gerenciar usuários', short_name: 'manage_users' },
      { name: 'Gerenciar formulários', short_name: 'manage_forms' },
      { name: 'Gerenciar campos de formulários', short_name: 'manage_form_fields' },
      { name: 'Gerenciar tipos de campo de formulários', short_name: 'manage_form_field_types' },
      { name: 'Gerenciar solicitações', short_name: 'manage_solicitations' },
      { name: 'Responder solicitações', short_name: 'answer_solicitation' },
      { name: 'Criar solicitações', short_name: 'create_solicitation' },
      { name: 'Solicitar reabertura de solicitações', short_name: 'reopen_solicitation' },
      { name: 'Avaliar atendimento', short_name: 'answer_satisfaction_survey' }
    ]);
  })
}