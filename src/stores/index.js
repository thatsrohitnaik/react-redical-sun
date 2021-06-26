import { observable, action } from 'mobx';

class ClientStore {
  @observable isLoadingProfile = true;
  @action toggleLoading = () => {
    this.isLoadingProfile = !this.isLoadingProfile;
  };

  @observable selectedClientDetails = {};
  @observable selectedClientPhone = null;
  @observable userComplaints = [];

  @action setSelectedClientPhone = value => {
    this.selectedClientPhone = value.phone;
    this.selectedClientDetails = value;
    this.getClientDetails();
    this.setUserComplaints();
  };
  @action setUserComplaints = () => {
    this.userComplaints = [
      {
        department: 'Plumbing',
        status: 'unassigned',
        description: ' Water is leaking in our bathroom',
        tech: ['Gary', 'herry'],
        complainDate: '10/01/2021',
        assignedDate: '11/01/2021',
        resolvedDate: '12/01/2021',
        techNote: 'work was completed'
      },
      {
        department: 'Electric',
        status: 'assigned',
        description: ' Water is leaking in our bathroom',
        tech: ['Gary', 'herry'],
        complainDate: '10/02/2021',
        assignedDate: '11/02/2021',
        resolvedDate: '12/02/2021',
        techNote: 'work was completed'
      },
      {
        department: 'Plumbing',
        status: 'completed',
        description: ' Water is leaking in our bathroom',
        tech: ['Gary', 'herry'],
        complainDate: '10/03/2021',
        assignedDate: '11/03/2021',
        resolvedDate: '12/03/2021',
        techNote: 'work was completed'
      }
    ];
  };

  @action getClientDetails = () => {
    // API

    this.selectedClientDetails = {
      ...this.selectedClientDetails,
      address: ' Near Blue Star Hotel, Panjim Goa',
      status: 'active'
    };

    console.log(this.selectedClientDetails);
  };

  @observable clientDropdown = [];

  @action getClientDropdown = search => {
    this.clientDropdown = [
      { code: 'AD', label: 'Joey', phone: '9673417124' },
      { code: 'AE', label: 'Chandler', phone: '8673417124' },
      { code: 'AF', label: 'Monica', phone: '9235379269' },
      { code: 'AG', label: 'Rachel', phone: '8345333445' },
      { code: 'AI', label: 'Pheobe', phone: '7643526189' },
      { code: 'AL', label: 'Ross', phone: '8355223445' }
    ];
  };
}

const stores = {
  clientStore: new ClientStore()
};

export default stores;
