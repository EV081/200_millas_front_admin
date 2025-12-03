import { useMemo, useState } from "react"

const LOCATIONS = [
    {
            id: 'LOCAL-001',
            name: "San Isidro",
            address: "Av. Conquistadores 1234",
            phone: "(01) 444-5555",
            hours: "Lun - Dom: 12:00pm - 11:00pm"
        },
        {
            id: 'LOCAL-002',
            name: "Miraflores",
            address: "Calle Berlin 456",
            phone: "(01) 444-6666",
            hours: "Lun - Dom: 12:00pm - 11:00pm"
        },
        {
            id: 'LOCAL-003',
            name: "La Molina",
            address: "Av. Raul Ferrero 789",
            phone: "(01) 444-7777",
            hours: "Lun - Dom: 12:00pm - 11:00pm"
        }
]

export const useLocation = () => {
    

    const [currentLocationId, setCurrentLocationId] = useState<string>(LOCATIONS[0].id);

    const setLocationById = (id: string) => {
        const locationExists = LOCATIONS.some(loc => loc.id === id);
        if (locationExists) {
            setCurrentLocationId(id);
        } else {
            console.warn(`Location with id ${id} does not exist.`);
        }
    }

    const getAllLocationNameAndIds = ()=>{
        return LOCATIONS.map(loc => ({id: loc.id, name: loc.name}));
    }

    const currentLocation = useMemo(() => LOCATIONS.find(loc => loc.id === currentLocationId) || LOCATIONS[0], [currentLocationId]);

    return {
        locations: LOCATIONS,
        currentLocation,
        setLocationById,
        getAllLocationNameAndIds
    }
}