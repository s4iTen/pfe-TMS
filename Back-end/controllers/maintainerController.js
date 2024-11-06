const maintainerService = require("../services/maintainerService");

async function getMaintainers(req, res) {
  try {
    const maintainers = await maintainerService.getAllMaintainers();
    res.status(200).json(maintainers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getMaintainer(req, res) {
  try {
    const maintainer = await maintainerService.getMaintainerById(req.params.id);
    if (!maintainer) {
      return res.status(404).json({ message: "Maintainer not found" });
    }
    res.status(200).json(maintainer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createMaintainer(req, res) {
  const {
    uploadedFiles: image,
    fullName,
    tel: Tel,
    email: Email,
    job: Job,
  } = req.body;
  if (!image || !fullName || !Tel || !Email || !Job) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newMaintainer = await maintainerService.createMaintainer({
      image,
      fullName,
      Tel,
      Email,
      Job,
    });

    res.status(201).json(newMaintainer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateMaintainer(req, res) {
  try {
    const updatedMaintainer = await maintainerService.updateMaintainer(
      req.params.id,
      req.body
    );
    if (!updatedMaintainer) {
      return res.status(404).json({ message: "Maintainer not found" });
    }
    res.status(200).json(updatedMaintainer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteMaintainer(req, res) {
  try {
    const deletedMaintainer = await maintainerService.deleteMaintainer(
      req.params.id
    );
    if (!deletedMaintainer) {
      return res.status(404).json({ message: "Maintainer not found" });
    }
    res.status(200).json({ message: "Maintainer deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getMaintainers,
  getMaintainer,
  createMaintainer,
  updateMaintainer,
  deleteMaintainer,
};
