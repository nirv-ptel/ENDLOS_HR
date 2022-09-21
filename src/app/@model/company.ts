export interface CompanyModel {
    company_id: number;
    companyName: string;
    companyNumber: number;
    companyEmail: string;
    companyGstNumber: string;
    companyAdd: string;
    companyActive: boolean;
    createdBy: string;
    createdDate: string;
    panelEntityList: [];
    userList: [];
}