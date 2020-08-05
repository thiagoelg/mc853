import { OnInit, Input, Component } from '@angular/core';
import { Solicitation } from 'src/app/models/solicitation';
import { Router } from '@angular/router';
import { TableEmittedAction } from 'src/app/shared/data-table/data-table.component';

@Component({
  selector: 'app-solicitations-list',
  templateUrl: './solicitations-list.component.html',
  styleUrls: ['./solicitations-list.component.css'],
})
export class SolicitationsListComponent implements OnInit {
  @Input() solicitations: Solicitation[] = [];

  rows: SolicitationRow[] = [];

  columnNames = {
    id: 'Número',
    submitter: 'Solicitante',
    manager: 'Atendente',
    created_at: 'Data de criação',
    updated_at: 'Data de atualização',
    solved_at: 'Data de resolução',
  };

  actions = [
    {
      name: 'details',
      label: 'Ver detalhes',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.rows = this.solicitations.map((s) => ({
      ...s,
      submitter: s.submitted_by_user?.name,
      manager: s.managed_by_user?.name,
    }));
  }

  onAction(event: TableEmittedAction) {
    this.router.navigate(['/solicitations', event.element.id]);
  }
}

type SolicitationRow = {
  submitter?: string;
  manager?: string;
};
