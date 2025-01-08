import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../App';
import { Plus, Calendar, Clock, BookOpen } from 'lucide-react';
import axios from 'axios';

const Milestones = () => {
  const { userId } = useContext(AppContext);
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBaby, setSelectedBaby] = useState('');
  const [babies, setBabies] = useState([]);
  
  // Form state
  const [formData, setFormData] = useState({
    milestoneName: '',
    dateAchieved: '',
    ageAchieved: '',
    notes: ''
  });
  const [showForm, setShowForm] = useState(false);

  // Fetch babies for the parent
  useEffect(() => {
    const fetchBabies = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/baby/${userId}`);
        setBabies(response.data.baby);
        if (response.data.babies.length > 0) {
          setSelectedBaby(response.data.baby[0]._id);
        }
      } catch (err) {
        setError('Failed to fetch babies');
      }
    };
    fetchBabies();
  }, [userId]);

  // Fetch milestones when baby is selected
  useEffect(() => {
    const fetchMilestones = async () => {
      if (!selectedBaby) return;
      
      setLoading(true);
      try {
        const response = await axios.get(`/api/milestones/${selectedBaby}`);
        setMilestones(response.data.milestones);
        setError(null);
      } catch (err) {
        setError('Failed to fetch milestones');
      } finally {
        setLoading(false);
      }
    };
    fetchMilestones();
  }, [selectedBaby]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post('/api/milestones', {
        ...formData,
        babyId: selectedBaby,
        parentId: userId
      });
      
      setMilestones([...milestones, response.data.milestone]);
      setShowForm(false);
      setFormData({
        milestoneName: '',
        dateAchieved: '',
        ageAchieved: '',
        notes: ''
      });
      setError(null);
    } catch (err) {
      setError('Failed to add milestone');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mx-auto pt-24 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-second-color funky-font">
            Baby Milestones
          </h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-third-color text-fourth-color px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-90"
          >
            <Plus size={20} />
            Add Milestone
          </button>
        </div>

        {/* Baby Selection */}
        <select
          value={selectedBaby}
          onChange={(e) => setSelectedBaby(e.target.value)}
          className="w-full mb-6 p-2 border rounded-lg text-fourth-color"
        >
          {babies.map(baby => (
            <option key={baby._id} value={baby._id}>
              {baby.name}
            </option>
          ))}
        </select>

        {/* Add Milestone Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-first-color p-6 rounded-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-fourth-color">Milestone Name</label>
                <input
                  type="text"
                  name="milestoneName"
                  value={formData.milestoneName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-lg"
                  placeholder="e.g., First Step"
                />
              </div>

              <div>
                <label className="block mb-2 text-fourth-color">Date Achieved</label>
                <input
                  type="date"
                  name="dateAchieved"
                  value={formData.dateAchieved}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block mb-2 text-fourth-color">Age (months)</label>
                <input
                  type="number"
                  name="ageAchieved"
                  value={formData.ageAchieved}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Age in months"
                />
              </div>

              <div>
                <label className="block mb-2 text-fourth-color">Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Add any notes..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-second-color text-fourth-color px-6 py-2 rounded-lg hover:bg-opacity-90"
            >
              {loading ? 'Adding...' : 'Add Milestone'}
            </button>
          </form>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Milestones List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {milestones.map(milestone => (
            <div
              key={milestone._id}
              className="bg-fourth-color p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold text-second-color mb-4 funky-font">
                {milestone.milestoneName}
              </h3>
              
              <div className="flex items-center gap-2 mb-2 text-fourth-color">
                <Calendar size={16} />
                <span>
                  {new Date(milestone.dateAchieved).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex items-center gap-2 mb-2 text-fourth-color">
                <Clock size={16} />
                <span>{milestone.ageAchieved} months</span>
              </div>
              
              {milestone.notes && (
                <div className="flex items-start gap-2 text-fourth-color">
                  <BookOpen size={16} className="mt-1" />
                  <p>{milestone.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center text-fourth-color mt-6">
            Loading...
          </div>
        )}

        {/* Empty State */}
        {!loading && milestones.length === 0 && (
          <div className="text-center text-fourth-color mt-6">
            No milestones recorded yet. Add your first milestone!
          </div>
        )}
      </div>
    </div>
  );
};

export default Milestones;