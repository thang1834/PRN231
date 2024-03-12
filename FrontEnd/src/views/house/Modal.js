<CModal size="lg" visible={visible} onClose={handleCloseModal} aria-labelledby="houseModalLabel">
    <CModalHeader onClose={handleCloseModal}>
        <CModalTitle id="houseModalLabel">
            {statusModal === 'create' ? 'Create New House' : 'Update House Details'}
        </CModalTitle>
    </CModalHeader>
    <CModalBody>
        {selectedHouse && (
            <>
                <CForm className="row g-3">
                    <CCol md={6}>
                        <CFormInput
                            type="text"
                            id="house_name"
                            label="Name"
                            value={selectedHouse.name || ''}
                            onChange={(e) => handleInputChange(e, 'name')}
                        />
                    </CCol>
                    <CCol md={6}>
                        <CFormInput
                            type="text"
                            id="house_location"
                            label="Location"
                            value={selectedHouse.location || ''}
                            onChange={(e) => handleInputChange(e, 'location')}
                        />
                    </CCol>
                    <CCol md={6}>
                        <CFormInput
                            type="number"
                            id="house_price"
                            label="Price"
                            value={selectedHouse.price || ''}
                            onChange={(e) => handleInputChange(e, 'price')}
                        />
                    </CCol>
                    <CCol md={6}>
                        <CFormInput
                            type="number"
                            id="house_bedrooms"
                            label="Bedrooms"
                            value={selectedHouse.bedrooms || ''}
                            onChange={(e) => handleInputChange(e, 'bedrooms')}
                        />
                    </CCol>
                    <CCol md={12}>
                        <CFormInput
                            type="text"
                            id="house_description"
                            label="Description"
                            value={selectedHouse.description || ''}
                            onChange={(e) => handleInputChange(e, 'description')}
                        />
                    </CCol>
                    {/* Additional house fields can be added here */}
                </CForm>
            </>
        )}
    </CModalBody>
    <CModalFooter>
        <CButton color="secondary" onClick={handleCloseModal}>
            Close
        </CButton>
        <CButton onClick={handleCreateOrUpdate} color="primary">
            {statusModal === 'create' ? 'Create' : 'Update'}
        </CButton>
    </CModalFooter>
</CModal>;
